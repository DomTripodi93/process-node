const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const { Schema } = mongoose;

const messageModel = new Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, required: true }
  }
);

messageModel.plugin(uniqueValidator);

module.exports = mongoose.model('Message', messageModel);