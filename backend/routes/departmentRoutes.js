const express = require('express');

const checkAuth = require("../middleware/check-auth");

function routes(Department) {
    const router = express.Router();
    router.route("")
        .post(checkAuth, (req, res) => {
            const dept = new Department(req.body);
            dept.userId = req.userId;
            dept.save((err) => {
                if (err) {
                  return res.send(err);
                }
                return res.json(dept);
              });
        });

    router.route("/byUser")
        .get(checkAuth, (req, res) => {
            const query = {
                userId: req.userId
            }
            Department.find(query, (err, depts) => {
                if (err) {
                    return res.send(err);
                }
                return res.json(depts);
            })
        });
    
    return router;
}

module.exports = routes;