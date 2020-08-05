function userController(User) {
    function getUserData(req, res) {
        const query = {
            _id: req.userId
        }
        User.find(query, (err, user) => {
            if (err) {
                return res.send(err);
            }
            if (!user[0].rootId){
                let userForUpdate = user[0].toObject();
                userForUpdate.rootId = userForUpdate._id;
                userForUpdate.defaultEmployeePassword = "Password1!"
                User.updateOne(query, userForUpdate)
                    .then(result => {
                        if (result.nModified > 0) {
                            delete userForUpdate.password;
                            return res.status(200).json(userForUpdate);
                        } else {
                            return res.status(500).json({ message: "Unable to Update Root Id" });
                        }
                    });
            } else {
                let userForReturn = user[0].toObject();
                delete userForReturn.password;
                return res.json(userForReturn);
            }
        })
    };

    function getEmployeesForUser(req, res) {
        const query = {
            rootId: req.rootId
        }
        User.find(query)
            .sort({name: 1})
            .exec((err, users) => {
                if (err) {
                    return res.send(err);
                }
                let usersForReturn = []
                users.forEach(user => {
                    usersForReturn.push({
                        id: user._id,
                        rootId: user.rootId,
                        email: user.email,
                        name: user.name,
                        deptName: user.deptName,
                        title: user.title,
                        canEdit: user.canEdit,
                    });
                });
                return res.json(usersForReturn);
            });
    }

    function put(req, res) {
        const query = {
            rootId: req.userId,
            _id: req.params._id
        }
        User.find(query, (err, users) => {
            if (err) {
                return res.send(err);
            }
            let userForUpdate = users[0].toObject();
            let keys = ["name", "email", "deptName", "canEdit", "title"];
            keys.forEach(key =>{
                userForUpdate[key] = req.body[key];
            })
            User.updateOne(query, userForUpdate)
                .then(result => {
                    if (result.nModified > 0) {
                        return res.status(200).json({ message: "Update Successful" });
                    } else {
                        return res.status(500).json({ message: "No Changes" });
                    }
                });
        });
    }

    return { getUserData, getEmployeesForUser, put }
}

module.exports = userController;