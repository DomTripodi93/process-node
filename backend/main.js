const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const env = require("./.env/env");
const userRoutes = require("./routes/userRoutes");


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

app.use("/api/auth", userRoutes);

module.exports = app;