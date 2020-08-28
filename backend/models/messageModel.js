const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const { Schema } = mongoose;

const messageModel = new Schema(
    {
        rootId: { type: String, required: true },
        userId: { type: String, required: true },
        userName: { type: String, required: true },
        lastChangeId: { type: String },
        lastChangeName: { type: String },
        message: { type: String, required: true },
        date: { type: Date, required: true },
        dateUpdated: { type: Date }
    }
);

messageModel.plugin(uniqueValidator);

module.exports = mongoose.model('Message', messageModel);