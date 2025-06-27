var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger/swagger-output.json");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var testRouter = require("./routes/test");

const myStudyInfoRouter = require("./routes/myStudyInfo");
var studyRoomRouter = require("./routes/studyRoomRoutes");
var signUpRouter = require("./routes/signUp");
var loginRouter = require("./routes/login");
var fineRankingRouter = require("./routes/fineRanking");

const cors = require("cors");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());
app.use(express.json());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/study-rooms", studyRoomRouter);
app.use("/test", testRouter);
app.use("/signUp", signUpRouter);
app.use("/myStudyInfo", myStudyInfoRouter);

app.use("/login", loginRouter);
app.use("/fine-ranking", fineRankingRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

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
