require("dotenv").config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const cookieParser = require('cookie-parser');
const logger = require('morgan');
let api = require("./api");
// const passport = require("passport");
const Auth = require("./auth/index");
const app = express();
const swaggerDocs = require('./config/swaggerDocs');

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());



app.use("/api", api);
app.use("/auth", Auth);
swaggerDocs(app);
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next();
// });

// error handler
app.use(function(err, req, res, next) {
  if(!err) next();
  // render the error page
  res.status(err.status || 500);
  res.json({'error': err.message || "error msg"});
});

let PORT = process.env.PORT || '8000';

app.listen(PORT,() =>{
  console.log("Server is listening on port "+ PORT);
});
// module.exports = app;