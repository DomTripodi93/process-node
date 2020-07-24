const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const { Schema } = mongoose;

const departmentModel = new Schema(
  {
    deptName: { type: String, required: true, unique: false },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: false },
    funcName: { type: String }
  }
);

departmentModel.index({deptName: 1, userId: 1}, {unique: true})

module.exports = mongoose.model('Department', departmentModel);