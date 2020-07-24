const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const { Schema } = mongoose;

const departmentModel = new Schema(
  {
    deptName: { type: String, required: true },
    userId: { type: String, required: true },
    funcName: { type: String }
  }
);

departmentModel.plugin(uniqueValidator);

module.exports = mongoose.model('Department', departmentModel);