const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const evn = require("../.env/env");

const router = express.Router();

router.post("/register", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      ...req.body,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed no user"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed result"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        env.tokenKey,
        { expiresIn: "24h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 86400,
        id: fetchedUser._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed error"
      });
    });
});

module.exports = router;