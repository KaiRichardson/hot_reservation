var express = require("express");
var path = require("path");

var reservations = [
];
var waitlist = [
];

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../front_end/home.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "../front_end/tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "../front_end/reserve.html"));
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

app.post("/api/tables", function(req, res) {
  var newReservations = req.body;

  newReservations.routeName = newReservations.name;

  if (reservations.length > 4) {
    waitlist.push(newReservations);
  } else {
    reservations.push(newReservations);
  }

  res.json(newReservations);

  console.log("reservations is: " + reservations.length);
  console.log("waitlist is: " + waitlist.length);
});
