var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var config = require("./config");
const mongoose = require("mongoose");
const passport = require("passport");
const helmet = require("helmet");

// import routes
var indexRouter = require("./routes/index");
var usersRouter = require("./user/users");
var departmentsRouter = require("./department/departments");
var requestsRouter = require("./request/requests");
var attendanceRouter = require("./attendance/attendance");
var uploadRouter = require("./upload/upload");

// import helpers
const AttendanceCron = require("./attendance/attendanceCron");

var app = express();
app.use(helmet());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// db connection

mongoose
  .connect(config.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to DB successfully"));
mongoose.set("useCreateIndex", true);

// passport initilaize
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/", indexRouter);
app.use("/departments", departmentsRouter);
app.use("/users", usersRouter);
app.use("/requests", requestsRouter);
app.use("/history", attendanceRouter);
app.use("/upload", uploadRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// run cronjob to get the full attendance at the end of every day
AttendanceCron.start();

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
