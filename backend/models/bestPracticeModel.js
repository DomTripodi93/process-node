const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const { Schema } = mongoose;

const bestPracticeModel = new Schema(
  {
    userId: { type: Number },
    deptName: { type: String, required: true },
    objectiveName: { type: String },
    stepNumber: { type: String },
    practice: { type: String },
    method: { type: String },
    purpose: { type: String}
  }
);

bestPracticeModel.plugin(uniqueValidator);

module.exports = mongoose.model('BestPractice', bestPracticeModel);