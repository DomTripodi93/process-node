const autoMapper = require("../middleware/autoMapper");
const dateRegulator = require("../middleware/dateRegulator");

function departmentController(Department) {

    function post(req, res) {
        const dept = new Department(req.body);
        dept.userId = req.rootId;
        dept.save((err) => {
            if (err) {
                return res.send(err);
            }
            res.status(201);
            return res.json(dept);
        });
    };

    function getByUser(req, res) {
        const query = {
            userId: req.rootId
        }
        Department.find(query, (err, depts) => {
            if (err) {
                return res.send(err);
            }
            return res.json(depts);
        });
    };

    function getByName(req, res) {
        const query = {
            userId: req.rootId,
            deptName: req.params.deptName
        }
        Department.find(query, (err, dept) => {
            if (err) {
                return res.send(err);
            }
            return res.json(dept[0]);
        });
    }

    function put(req, res) {
        let query = { deptName: req.params.deptName, userId: req.rootId };
        Department.find(query, (err, depts) => {
            if (err) {
                return res.send(err);
            }
            let newDept = autoMapper(depts[0], req.body);
            newDept.lastUpdated = dateRegulator(new Date);
            Department.updateOne(query, newDept)
                .then(result => {
                    if (result.nModified > 0) {
                        return res.status(200).json({ message: "Update Successful" });
                    } else {
                        return res.status(500).json({ message: "No Changes" });
                    }
                });
        });
    }


    return { post, getByUser, getByName, put };
}

module.exports = departmentController;