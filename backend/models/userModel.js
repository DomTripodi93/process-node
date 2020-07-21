const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const { Schema } = mongoose;

const userModel = new Schema(
  {
    rootId: { type: Number },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    deptName: { type: String },
    title: { type: String },
    canEdit: { type: Boolean, default: false },
  }
);
userModel.plugin(AutoIncrement, {inc_field: 'id'});

userModel.plugin(uniqueValidator);

module.exports = mongoose.model('User', userModel);