// Requiring necessary packages
var express = require("express");
require('dotenv').config();
var exphbs = require("express-handlebars");
var app = express();

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
const { Client } = require('pg');

// Creating express app and configuring middleware needed for authentication
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// *** Used to add initial data to create DB *****
// const query = {
//     text: 'INSERT INTO houses(number, street, lat, long, treat, trick, description) VALUES($1, $2, $3, $4, $5, $6, $7)',
//     values: [334, 'Coble Dr.', 89.077, 67.00, 0, 1, 'This is a description'],
//   }

// Setup Postgres DB details and connect.
const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: 5432,
  })

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Requiring our routes
require("./routes/routes.js")(app);

// Connect DB and Start server then log message upon success
client.connect()
client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
})

  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });