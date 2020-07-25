const mongoose = require('mongoose');

const { Schema } = mongoose;

const stepModel = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: false },
    deptName: { type: String, required: true, unique: false },
    objectiveName: { type: String, required: true, unique: false },
    stepNumber: { type: String, required: true, unique: false },
    name: { type: String },
    goal: { type: String }
  }
);

stepModel.index({deptName: 1, userId: 1, objectiveName: 1, stepNumber: 1}, {unique: true})

module.exports = mongoose.model('Step', stepModel);