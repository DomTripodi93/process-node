const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const { Schema } = mongoose;

const objectiveModel = new Schema(
  {
    userId: { type: String, required: true },
    deptName: { type: String, required: true },
    objectiveName: { type: String, required: true },
    goal: {type: String},
    time: {type: Number}
  }
);

objectiveModel.plugin(uniqueValidator);

module.exports = mongoose.model('Objective', objectiveModel);