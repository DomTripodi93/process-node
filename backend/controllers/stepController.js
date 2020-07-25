const autoMapper = require("../middleware/autoMapper");

function stepController(Step) {

    function post(req, res) {
        const step = new Step(req.body);
        step.userId = req.userId;
        step.save((err) => {
            if (err) {
                return res.send(err);
            }
            res.status(201);
            return res.json(step);
        });
    };

    function getByObjective(req, res) {
        const query = {
            userId: req.userId,
            deptName: req.params.department,
            objectiveName: req.params.objective
        }
        Step.find(query, (err, steps) => {
            if (err) {
                return res.send(err);
            }
            return res.json(steps);
        });
    };

    function getByNumber(req, res) {
        const query = {
            userId: req.userId,
            deptName: req.params.department,
            objectiveName: req.params.objective,
            stepNumber: req.params.step
        }
        Step.find(query, (err, step) => {
            if (err) {
                return res.send(err);
            }
            return res.json(step[0]);
        });
    }

    function put(req, res) {
        let query = { 
            userId: req.userId,
            objectiveName: req.params.objective,
            deptName: req.params.department,
            stepNumber: req.params.step
        };
        Step.find(query, (err, steps) => {
            if (err) {
                return res.send(err);
            }
            let newDept = autoMapper(steps[0], req.body);
            Step.updateOne(query, newDept)
                .then(result => {
                    if (result.nModified > 0) {
                        return res.status(200).json({ message: "Update Successful" });
                    } else {
                        return res.status(500).json({ message: "No Changes" });
                    }
                });
        });
    }


    return { post, getByObjective, getByNumber, put };
}

module.exports = stepController;