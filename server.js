//dependencies
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");
var path = require("path");

//initialize Express app
var express = require("express");
var app = express();

app.use(logger("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

//Require set up handlebars
var exphbs = require("express-handlebars");
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

//connecting to MongoDB
//mongoose.connect("mongodb://localhost/scraped_news");
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://heroku_xn5xm63m:mefj86a1glsmvfksk5ei1sol0i@ds217438.mlab.com:17438/heroku_xn5xm63m";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to Mongoose!");
});

var routes = require("./controller/controller.js");
app.use("/", routes);
//Create localhost port
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on PORT " + port);
});