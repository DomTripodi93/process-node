const express = require('express');

function routes(Department) {
    const router = express.Router();

    router.post("/", (req, res) => {
        const dept = new Department(req.body);
        dept.userId = req.userId;
        dept.save();
        res.status(201);
        return res.json(dept);
    });

    router.get("/byUser", (req, res) => {
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