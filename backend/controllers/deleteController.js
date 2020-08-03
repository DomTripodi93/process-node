function deleteController(Models) {
    function deleteOne(req, res) {
        let query = {
            userId: req.userId
        }
        Object.keys(req.params).forEach(key => {
            query[key] = req.params[key];
        })
        Models[0].deleteOne(query).then(
            result => {
                if (result.n > 0) {
                    return res.status(200).json({ message: "Deletion successful!" });
                } else {
                    return res.status(500).json({ message: "Cannot Delete" });
                }
            }
        );
    }

    function deleteCascade(req, res) {
        let query = {
            userId: req.userId
        }
        Object.keys(req.params).forEach(key => {
            query[key] = req.params[key];
        })
        for (let i = 1; i < Models.length; i++) {
            Models[i].deleteMany(query).then(()=>{});
        }
        Models[0].deleteOne(query).then(
            result => {
                if (result.n > 0) {
                    return res.status(200).json({ message: "Deletion successful!" });
                } else {
                    return res.status(500).json({ message: "Cannot Delete" });
                }
            }
        );
    }

    function deleteEmployee(req, res) {
        let queryUser = {
            rootId: req.userId,
            _id: req.params._id
        }
        let querySchedule = {
            userId: req.userId,
            employeeId: req.params._id
        }
        Models[1].deleteMany(querySchedule)
            .then(resultSchedule => {
                if (resultSchedule.n > 0) {
                    Models[0].deleteOne(queryUser)
                        .then(resultUser => {
                            if (resultUser.n > 0) {
                                return res.status(200).json({ message: "Deletion successful!" });
                            } else {
                                return res.status(500).json({ message: "Cannot Delete Employee" });
                            }
                        })
                } else {
                    return res.status(500).json({ message: "Cannot Delete Schedule" });
                }                
            })
        
    }

    return { deleteOne, deleteCascade, deleteEmployee }
}

module.exports = deleteController;