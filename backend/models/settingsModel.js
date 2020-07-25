const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const { Schema } = mongoose;

const settingsModel = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    isNew: { type: Boolean, default: true },
    initialEmployeePassword: { type: String, required: true }
  }
);

settingsModel.plugin(uniqueValidator);

module.exports = mongoose.model('Settings', settingsModel);