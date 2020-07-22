const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const { Schema } = mongoose;

const bestPracticeModel = new Schema(
  {
    userId: { type: Number, required: true },
    deptName: { type: String, required: true },
    objectiveName: { type: String, required: true },
    stepNumber: { type: String, required: true },
    practice: { type: String, required: true },
    method: { type: String },
    purpose: { type: String}
  }
);

bestPracticeModel.plugin(uniqueValidator);

module.exports = mongoose.model('BestPractice', bestPracticeModel);