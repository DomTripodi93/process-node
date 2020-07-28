const autoMapper = require("../middleware/autoMapper");

function scheduleController(Schedule) {

    function post(req, res) {
        const schedule = new Schedule(req.body);
        schedule.userId = req.userId;
        const timeZoneOffset = (new Date).getTimezoneOffset() * 60000;
        schedule.date = new Date((new Date(schedule.date) - timeZoneOffset));
        schedule.status = "Scheduled"
        schedule.save((err) => {
            if (err) {
                return res.send(err);
            }
            res.status(201);
            return res.json(schedule);
        });
    };

    function getDateRange(startDate, endDate) {
        const startInfo = startDate.split("-");
        startInfo[1] -= 1;
        const endInfo = endDate.split("-");
        endInfo[1] -= 1;

        return {
            $gte: new Date(Date.UTC(...startInfo, 00, 00, 00)),
            $lt: new Date(Date.UTC(...endInfo, 23, 59, 59))
        }
    }

    function getByDay(req, res) {
        const day = req.params.date;
        const query = {
            userId: req.userId,
            date: getDateRange(day, day)
        }
        Schedule.find(query)
            .sort({date: 1})
            .exec((err, schedules) => {
            if (err) {
                return res.send(err);
            }
            return res.json(schedules);
        });
    };

    function getByEmployeeDay(req, res) {
        const day = req.params.date;
        const query = {
            userId: req.userId,
            date: getDateRange(day, day),
            employeeId: req.params.employeeId
        }
        Schedule.find(query)
            .sort({date: 1})
            .exec((err, schedules) => {
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
            let scheduleForUpdate = autoMapper(schedules[0], req.body);
            const timeZoneOffset = (new Date).getTimezoneOffset() * 60000;
            scheduleForUpdate.date = new Date((new Date(scheduleForUpdate.date) - timeZoneOffset));
            Schedule.updateOne(query, scheduleForUpdate)
                .then(result => {
                    if (result.nModified > 0) {
                        return res.status(200).json({ message: "Update Successful" });
                    } else {
                        return res.status(500).json({ message: "No Changes" });
                    }
                });
        });
    }

    const rootScheduleFunctions = {
        post,
        getByDay,
        getByEmployeeDay,
        getById,
        put
    };

    //Below functions for employee use

    function getByMonthForEmployee(req, res) {
        const startDayArr =  req.params.date.split("-");
        startDayArr[2] = 1;
        const startDay = startDayArr.join("-");
        const endDay =  req.params.date;
        const query = {
            employeeId: req.userId,
            date: getDateRange(startDay, endDay)
        }
        Schedule.find(query)
            .sort({date: 1})
            .exec((err, schedules) => {
            if (err) {
                return res.send(err);
            }
            return res.json(schedules);
        });
    };

    function getByDayForEmployee(req, res) {
        const day = req.params.date;
        const query = {
            employeeId: req.userId,
            date: getDateRange(day, day)
        }
        Schedule.find(query)
            .sort({date: 1})
            .exec((err, schedules) => {
            if (err) {
                return res.send(err);
            }
            return res.json(schedules);
        });
    };

    function putStatus(req, res) {
        const query = {
            employeeId: req.userId,
            _id: req.params.id,
        }
        Schedule.find(query, (err, schedules) => {
            if (err) {
                return res.send(err);
            }
            let scheduleForUpdate = schedules[0];
            scheduleForUpdate.status = req.params.status;
            Schedule.updateOne(query, scheduleForUpdate)
                .then(result => {
                    if (result.nModified > 0) {
                        return res.status(200).json({ message: "Update Successful" });
                    } else {
                        return res.status(500).json({ message: "No Changes" });
                    }
                });
        });
    };

    const employeeScheduleFunctions = {
        getByMonthForEmployee,
        getByDayForEmployee,
        putStatus
    };

    return { ...rootScheduleFunctions, ...employeeScheduleFunctions };
}

module.exports = scheduleController;