const autoMapper = require("../middleware/autoMapper");

function scheduleController(Schedule) {

    function post(req, res) {
        const schedule = new Schedule(req.body);
        schedule.userId = req.userId;
        schedule.save((err) => {
            if (err) {
                return res.send(err);
            }
            res.status(201);
            return res.json(schedule);
        });
    };

    function getByUser(req, res) {
        const day = req.params.year + "-" + req.params.month + "-" + req.params.day
        const query = {
            userId: req.userId,
            date: {
                $gte: new Date(new Date(day).setHours(00, 00, 00)),
                $lt: new Date(new Date(day).setHours(23, 59, 59))
            }
        }
        Schedule.find(query, (err, schedules) => {
            if (err) {
                return res.send(err);
            }
            return res.json(schedules);
        });
    };

    function getById(req, res) {
        const query = {
            userId: req.userId,
            _id: req.params._id
        }
        Schedule.find(query, (err, schedule) => {
            if (err) {
                return res.send(err);
            }
            return res.json(schedule[0]);
        });
    }

    function put(req, res) {
        const query = {
            userId: req.userId,
            _id: req.params._id
        }
        Schedule.find(query, (err, schedules) => {
            if (err) {
                return res.send(err);
            }
            let newSchedule = autoMapper(schedules[0], req.body);
            Schedule.updateOne(query, newSchedule)
                .then(result => {
                    if (result.nModified > 0) {
                        return res.status(200).json({ message: "Update Successful" });
                    } else {
                        return res.status(500).json({ message: "No Changes" });
                    }
                });
        });
    }


    return { post, getByUser, getById, put };
}

module.exports = scheduleController;