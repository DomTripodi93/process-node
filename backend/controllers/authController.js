const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const env = require("../.env/env");

function authController (User) {
    function postRegister(req, res ) {
        bcrypt.hash(req.body.password, 10).then(hash => {
          const user = new User({
            ...req.body,
            password: hash
          });
          user.save()
            .then(result => {
              return res.status(201).json({
                message: "User created!",
                result: {
                    id: result._id,
                    rootId: result.rootId,
                    email: result.email,
                    name: result.name,
                    deptName: result.deptName,
                    title: result.title,
                    canEdit: result.canEdit,}
              });
            })
            .catch(err => {
              return res.status(500).json({
                error: err
              });
            });
        });
      };
      
      function postLogin(req, res ) {
        let fetchedUser;
        User.findOne({ email: req.body.email })
          .then(user => {
            if (!user) {
              return res.status(401).json({
                message: "Auth failed, no user"
              });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
          })
          .then(result => {
            if (!result) {
              return res.status(401).json({
                message: "Auth failed, no result"
              });
            }
            const token = jwt.sign(
              { email: fetchedUser.email, userId: fetchedUser._id },
              env.tokenKey,
              { expiresIn: "24h" }
            );
            return res.status(200).json({
              token: token,
              expiresIn: 86400,
              id: fetchedUser._id
            });
          })
          .catch(err => {
            return res.status(500).json({
              message: "Auth failed, error"
            });
          });
      };

      return { postRegister, postLogin };
}

module.exports = authController;