const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const { Schema } = mongoose;

const commonDifficultyModel = new Schema(
  {
    userId: { type: Number },
    deptName: { type: String, required: true },
    objectiveName: { type: String },
    stepNumber: { type: String },
    difficulty: { type: String },
    cause: { type: String },
    solution: { type: String}
  }
);

commonDifficultyModel.plugin(uniqueValidator);

module.exports = mongoose.model('CommonDifficulty', commonDifficultyModel);