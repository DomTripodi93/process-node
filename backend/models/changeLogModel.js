const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const { Schema } = mongoose;

const changeLogModel = new Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    rootId: { type: String, required: true },
    changedModel: { type: String },
    oldValues: { type: String },
    newValues: { type: String },
    timeUpdated: { type: Date }
  }
);

changeLogModel.plugin(uniqueValidator);

module.exports = mongoose.model('ChangeLog', changeLogModel);