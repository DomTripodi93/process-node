const express = require('express');
const checkAuth = require("../middleware/check-auth");

function routes(Department) {
    const router = express.Router();

    router.post("/", checkAuth, (req, res) => {
        const dept = new Department(req.body);
        dept.userId = req.userId;
        dept.save();
        res.status(201);
        return res.json(dept);
    });

    router.get("/byUser", checkAuth, (req, res) => {
        const query = {
            userId: req.userId
        }
        Department.find(query, (err, depts) => {
            if (err) {
                return res.send(err);
            }
            res.json(depts);
        })
    });
}

module.exports = routes;