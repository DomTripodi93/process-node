const express = require("express");

const User = require("../models/userModel");
const checkAuth = require("../middleware/checkAuth");
const router = express.Router();

router.get("", checkAuth, (req, res) => {
    const query = {
        _id: req.userId
    }
    User.find(query, (err, user) => {
        if (err) {
            return res.send(err);
        }
        if (!user[0].toObject().rootId){
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
});

module.exports = router;