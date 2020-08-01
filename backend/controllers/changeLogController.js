const dateRegulator = require("../middleware/dateRegulator");

function changeLogController(ChangeLog, Model, modelName) {
    function post(req, res, next) {
        let newValues = "";
        if (req.method === "DELETE"){
            newValues = "Deleted";
        } else {
            newValues = JSON.stringify(req.body);
        }

        let query = {
            userId: req.userId
        }
        Object.keys(req.params).forEach(key => {
            query[key] = req.params[key];
        })
        Model.find(query, (err, results) => {
            if (err) {
                return res.send(err);
            }
            let result = results[0];
            const changeLog = new ChangeLog({
                userId: req.userId,
                changedModel: modelName,
                oldValues: JSON.stringify(result),
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

    return { post }
}

module.exports = changeLogController;