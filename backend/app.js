const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const env = require("./.env/env");

const User = require("./models/userModel");
const authRoutes = require("./routes/authRoutes")(User);
const userRoutes = require("./routes/userRoutes")(User);
const ChangeLog = require("./models/changeLogModel");
const changeLogRoutes = require("./routes/changeLogRoutes")(ChangeLog);
const Message = require("./models/messageModel");
const messageRoutes = require("./routes/messageRoutes")(Message, User, ChangeLog);
const Schedule = require("./models/scheduleModel");
const scheduleRoutes = require("./routes/scheduleRoutes")(Schedule, ChangeLog);
const employeeRoutes = require("./routes/employeeRoutes")(User, Schedule);

const BestPractice = require("./models/bestPracticeModel");
const bestPracticeRoutes = require("./routes/bestPracticeRoutes")(BestPractice, ChangeLog);
const CommonDifficulty = require("./models/commonDifficultyModel");
const commonDifficultyRoutes = require("./routes/commonDifficultyRoutes")(CommonDifficulty, ChangeLog);
const Step = require("./models/stepModel");
const stepRoutes = require("./routes/stepRoutes")(Step, BestPractice, CommonDifficulty, ChangeLog);
const Objective = require("./models/objectiveModel");
const objectiveRoutes = require("./routes/objectiveRoutes")(Objective, Step, Schedule, ChangeLog);
const Department = require("./models/departmentModel");
const departmentRoutes = require("./routes/departmentRoutes")(Department, Objective, ChangeLog);
const serverless = require('serverless-http');


const app = express();

mongoose
  .connect(
    "mongodb+srv://proc:" + 
    env.dbpw +
    "@proc.sfuco.mongodb.net/" +
    env.dbName +
    "?retryWrites=true&w=majority", 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


app.use("/api/test", (req, res)=>{res.send({'response': {'body': "test successful"}})})
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/objective", objectiveRoutes);
app.use("/api/step", stepRoutes);
app.use("/api/bestPractice", bestPracticeRoutes);
app.use("/api/commonDifficulty", commonDifficultyRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/changeLog", changeLogRoutes);
app.use("/api/message", messageRoutes);


module.exports.handler = app;
