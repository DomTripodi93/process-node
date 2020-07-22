const mongoose = require('mongoose');

const { Schema } = mongoose;

const settingsModel = new Schema(
  {
    userId: { type: Number, required: true },
    isNew: { type: Boolean, default: true },
    initialEmployeePassword: { type: String, required: true }
  }
);

module.exports = mongoose.model('Settings', settingsModel);