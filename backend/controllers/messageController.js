const dateRegulator = require("../middleware/dateRegulator");

const messageController = (Message, User) => {
    function post(req, res, next) {
        let query = {
            userId: req.userId
        };
        User.findOne(query, (err, user) => {
            if (err) {
                return res.send(err);
            }
            let message = new Message({
                message: req.body.message,
                rootId: req.rootId,
                userId: req.userId,
                userName: user.name,
                date: dateRegulator(new Date)
            });
            message.save((err) => {
                if (err) {
                    return res.send(err);
                }
                res.status(201);
                next();
            });
        })
    }

    function get(req, res) {
        const query = {
            userId: req.rootId
        }
        Message.find(query)
            .sort({date: 1})
            .limit(2)
            .exec((err, messages) => {
                if (err) {
                    return res.send(err);
                }
                return res.json(messages);
            });
    };

    function getByPage(req, res) {
        const query = {
            userId: req.rootId
        }
        Message.find(query)
            .sort({date: 1})
            .skip(((req.params.page-1)*5) + 2)
            .limit(5)
            .exec((err, messages) => {
                if (err) {
                    return res.send(err);
                }
                return res.json(messages);
            });
    };

    function put(req, res) {
        let query = { 
            rootId: req.rootId,
            _id: req.params._id
        };
        Message.findOne(query, (err, message) => {
            if (err) {
                return res.send(err);
            }
            let userQuery = {
                userId: req.userId
            };
            User.findOne(userQuery, (err, user) => {
                if (err) {
                    return res.send(err);
                }
                let newMessage = {
                    ...message, 
                    ...req.body,
                    lastChangeId: req.userId,
                    lastChangeName: user.name
                };
                newMessage.date = dateRegulator(new Date);
                Message.updateOne(query, newMessage)
                    .then(result => {
                        if (result.nModified > 0) {
                            return res.status(200).json({ message: "Update Successful" });
                        } else {
                            return res.status(500).json({ message: "No Changes" });
                        }
                    });
            });
        });
    }

    return { post, get, getByPage, put }
}

module.exports = messageController;