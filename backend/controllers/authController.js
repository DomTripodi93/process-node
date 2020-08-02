const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const env = require("../.env/env");

function authController (User) {
    function postRegister(req, res ) {
        bcrypt.hash(req.body.password, 10).then(hash => {
          const user = new User({
            title: "Owner",
            ...req.body,
            password: hash,
            defaultEmployeePassword: "Password1!"
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
                    canEdit: result.canEdit,
                    defaultEmployeePassword: result.defaultEmployeePassword
                }
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
              { userId: fetchedUser._id, rootId: fetchedUser.rootId, name: fetchedUser.name },
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

      function putPassword(req, res) {
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
            } else {
              bcrypt.hash(req.body.newPassword, 10).then(hash => {
                fetchedUser.password = hash;
                fetchedUser.save()
                  .then((err)=>{
                    if (err) {
                        return res.send(err);
                    }
                    return({message: "Password update successful"})
                  })
              });
            }
            
          })
          .catch(err => {
            return res.status(500).json({
              message: "Auth failed, error"
            });
          });

      }

      return { postRegister, postLogin, putPassword };
}

module.exports = authController;