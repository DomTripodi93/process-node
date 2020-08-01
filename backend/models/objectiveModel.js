const mongoose = require('mongoose');

const { Schema } = mongoose;

const objectiveModel = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: false },
    deptName: { type: String, required: true, unique: false },
    objectiveName: { type: String, required: true, unique: false },
    goal: {type: String},
    time: {type: Number},
    lastUpdated: { type: Date }
  }
);

objectiveModel.index({deptName: 1, userId: 1, objectiveName: 1}, {unique: true});

module.exports = mongoose.model('Objective', objectiveModel);