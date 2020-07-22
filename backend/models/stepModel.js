const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const { Schema } = mongoose;

const stepModel = new Schema(
  {
    userId: { type: Number },
    deptName: { type: String, required: true },
    objectiveName: { type: String },
    stepNumber: { type: String },
    name: { type: String },
    goal: { type: String }
  }
);

stepModel.plugin(uniqueValidator);

module.exports = mongoose.model('Step', stepModel);