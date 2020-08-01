const mongoose = require('mongoose');

const { Schema } = mongoose;

const commonDifficultyModel = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: false },
    deptName: { type: String, required: true, unique: false },
    objectiveName: { type: String, required: true, unique: false },
    stepNumber: { type: String, required: true, unique: false },
    difficulty: { type: String, required: true, unique: false },
    cause: { type: String },
    solution: { type: String},
    lastUpdated: { type: Date }
  }
);

commonDifficultyModel.index({
    deptName: 1, 
    userId: 1, 
    objectiveName: 1, 
    stepNumber: 1, 
    difficulty: 1
}, {unique: true});

module.exports = mongoose.model('CommonDifficulty', commonDifficultyModel);