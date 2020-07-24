const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const { Schema } = mongoose;

const commonDifficultyModel = new Schema(
  {
    userId: { type: String, required: true },
    deptName: { type: String, required: true },
    objectiveName: { type: String, required: true },
    stepNumber: { type: String, required: true },
    difficulty: { type: String, required: true },
    cause: { type: String },
    solution: { type: String}
  }
);

commonDifficultyModel.plugin(uniqueValidator);

module.exports = mongoose.model('CommonDifficulty', commonDifficultyModel);