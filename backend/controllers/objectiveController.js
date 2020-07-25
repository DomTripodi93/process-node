const autoMapper = require("../middleware/autoMapper");

function objectiveController(Objective) {

    function post(req, res) {
        const objective = new Objective(req.body);
        objective.userId = req.userId;
        objective.save((err) => {
            if (err) {
                return res.send(err);
            }
            res.status(201);
            return res.json(objective);
        });
    };

    function getByDepartment(req, res) {
        const query = {
            userId: req.userId,
            deptName: req.params.department
        }
        Objective.find(query, (err, objectives) => {
            if (err) {
                return res.send(err);
            }
            return res.json(objectives);
        });
    };

    function getByName(req, res) {
        const query = {
            userId: req.userId,
            objectiveName: req.params.objective,
            deptName: req.params.department
        }
        Objective.find(query, (err, objective) => {
            if (err) {
                return res.send(err);
            }
            return res.json(objective[0]);
        });
    }

    function put(req, res) {
        let query = { 
            userId: req.userId,
            objectiveName: req.params.objective,
            deptName: req.params.department
        };
        Objective.find(query, (err, objectives) => {
            if (err) {
                return res.send(err);
            }
            let newDept = autoMapper(objectives[0], req.body);
            Objective.updateOne(query, newDept)
                .then(result => {
                    if (result.nModified > 0) {
                        return res.status(200).json({ message: "Update Successful" });
                    } else {
                        return res.status(500).json({ message: "No Changes" });
                    }
                });
        });
    }


    return { post, getByDepartment, getByName, put };
}

module.exports = objectiveController;