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
                User.updateOne(userForUpdate)
                    .then(result => {
                        if (result.nModified > 0) {
                            return res.status(200).json({ message: "Updated Root Id" });
                        } else {
                            return res.status(500).json({ message: "Unable to Update Root Id" });
                        }
                    });
            } else {
                return res.json(user[0]);
            }
        })
    };

    return { getUserData }
}

module.exports = userController;