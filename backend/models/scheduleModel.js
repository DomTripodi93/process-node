const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const { Schema } = mongoose;

const commonDifficultyModel = new Schema(
  {
    userId: { type: Number, required: true },
    employeeId: { type: Number, required: true },
    employeeName: { type: String, required: true },
    deptName: { type: String, required: true },
    objectiveName: { type: String, required: true }
  }
);

commonDifficultyModel.plugin(uniqueValidator);

module.exports = mongoose.model('CommonDifficulty', commonDifficultyModel);