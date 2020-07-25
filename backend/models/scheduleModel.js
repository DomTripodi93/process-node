const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const { Schema } = mongoose;

const scheduleModel = new Schema(
  {
    userId: { type: String, required: true },
    employeeId: { type: Number, required: true },
    employeeName: { type: String, required: true },
    deptName: { type: String, required: true },
    objectiveName: { type: String, required: true },
    date: { type: Date, required: true }
  }
);

scheduleModel.plugin(uniqueValidator);

module.exports = mongoose.model('Schedule', scheduleModel);