const mongoose = require('mongoose');

const { Schema } = mongoose;

const bestPracticeModel = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: false },
    deptName: { type: String, required: true, unique: false },
    objectiveName: { type: String, required: true, unique: false },
    stepNumber: { type: String, required: true, unique: false },
    practice: { type: String, required: true, unique: false },
    method: { type: String },
    purpose: { type: String},
    lastUpdated: { type: Date }
  }
);

bestPracticeModel.index({
    deptName: 1, 
    userId: 1, 
    objectiveName: 1, 
    stepNumber: 1, 
    practice: 1
}, {unique: true});

module.exports = mongoose.model('BestPractice', bestPracticeModel);