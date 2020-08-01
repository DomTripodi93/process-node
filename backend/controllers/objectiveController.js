const autoMapper = require("../middleware/autoMapper");
const dateRegulator = require("../middleware/dateRegulator");

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
            deptName: req.params.deptName
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
            objectiveName: req.params.objectiveName,
            deptName: req.params.deptName
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
            objectiveName: req.params.objectiveName,
            deptName: req.params.deptName
        };
        Objective.find(query, (err, objectives) => {
            if (err) {
                return res.send(err);
            }
            let newObjective = autoMapper(objectives[0], req.body);
            newObjective.lastUpdated = dateRegulator(new Date);
            Objective.updateOne(query, newObjective)
                .then(result => {
                    if (result.nModified > 0) {
                        return res.status(200).json({ message: "Update Successful" });
                    } else {
                        return res.status(500).json({ message: "No Changes" });
                    }
                });
        });
    }

    //Below functions for employee use

    function getForEmployee(req, res) {
        const query = {
            userId: req.rootId,
            objectiveName: req.params.objectiveName,
            deptName: req.params.deptName
        }
        Objective.find(query, (err, objective) => {
            if (err) {
                return res.send(err);
            }
            return res.json(objective);
        });
    }


    return { post, getByDepartment, getByName, put, getForEmployee };
}

module.exports = objectiveController;