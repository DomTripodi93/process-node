const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const { Schema } = mongoose;

const objectiveModel = new Schema(
  {
    userId: { type: Number },
    deptName: { type: String, required: true },
    objectiveName: { type: String },
    goal: {type: String},
    time: {type: Number}
  }
);

objectiveModel.plugin(uniqueValidator);

module.exports = mongoose.model('Objective', objectiveModel);