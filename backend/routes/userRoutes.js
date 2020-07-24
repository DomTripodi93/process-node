const express = require("express");

const User = require("../models/userModel");
const checkAuth = require("../middleware/checkAuth");
const router = express.Router();

router.get("", checkAuth, (req, res) => {
    const query = {
        userId: req.userId
    }
    User.find(query, (err, user) => {
        if (err) {
            return res.send(err);
        }
        return res.json(user[0]);
    })
})

module.exports = router;