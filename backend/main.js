const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const env = require("./.env/env");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const Department = require("./models/departmentModel");
const departmentRoutes = require("./routes/departmentRoutes")(Department);
const Objective = require("./models/objectiveModel");
const objectiveRoutes = require("./routes/objectiveRoutes")(Objective);
const Step = require("./models/stepModel");
const stepRoutes = require("./routes/stepRoutes")(Step);
const BestPractice = require("./models/bestPracticeModel");
const bestPracticeRoutes = require("./routes/bestPracticeRoutes")(BestPractice);

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
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
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

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/objective", objectiveRoutes);
app.use("/api/step", stepRoutes);
app.use("/api/bestPractice", bestPracticeRoutes);


const port = process.env.PORT || 3200;

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
