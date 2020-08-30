const dateRegulator = require("../middleware/dateRegulator");

function changeLogController(ChangeLog, Model, modelName) {
    function post(req, res, next) {
        let newValues = "";
        if (req.method === "DELETE") {
            newValues = "Deleted";
        } else {
            newValues = JSON.stringify(req.body);
        }

        let query = {
            userId: req.rootId
        };

        Object.keys(req.params).forEach(key => {
            if (key !== "status") {
                query[key] = req.params[key];
            }
        })
        Model.find(query, (err, results) => {
            if (err) {
                return res.send(err);
            }
            let changeLog = new ChangeLog({
                userId: req.userId,
                rootId: req.rootId,
                userName: req.name,
                changedModel: modelName,
                oldValues: JSON.stringify(results[0]),
                newValues: newValues,
                timeUpdated: dateRegulator(new Date)
            })
            changeLog.save((err) => {
                if (err) {
                    return res.send(err);
                }
                res.status(201);
                next();
            });
        })
    }

    function postByRoot(req, res, next) {
        let newValues = "";
        let timeStamp = dateRegulator(new Date);
        if (req.method === "DELETE") {
            newValues = "Deleted";
        } else if (modelName === "message") {
            let newValHold = { ...req.body }
            newValHold.dateUpdated = timeStamp;
            newValues = JSON.stringify(newValHold);
        } else {
            newValues = JSON.stringify(req.body);
        }

        let query = {
            rootId: req.rootId
        };

        Object.keys(req.params).forEach(key => {
            if (key !== "status") {
                query[key] = req.params[key];
            }
        })
        Model.find(query, (err, results) => {
            if (err) {
                return res.send(err);
            }
            let changeLog = new ChangeLog({
                userId: req.userId,
                rootId: req.rootId,
                userName: req.name,
                changedModel: modelName,
                oldValues: JSON.stringify(results[0]),
                newValues: newValues,
                timeUpdated: timeStamp
            })
            changeLog.save((err) => {
                if (err) {
                    return res.send(err);
                }
                res.status(201);
                next();
            });
        })
    }

    function getChanges(req, res) {
        let query = {
            rootId: req.rootId,
            changedModel: req.params.model
        };

        ChangeLog.find(query)
            .sort({ timeUpdated: -1 })
            .skip((req.params.page - 1) * 10)
            .limit(10)
            .exec((err, changes) => {
                if (err) {
                    return res.send(err);
                }
                return res.json(changes);
            })
    }

    return { post, postByRoot, getChanges }
}

module.exports = changeLogController;