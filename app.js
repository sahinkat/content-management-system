// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");

const config = require('./config/development');
// Imports routes
const dashboardRoute = require('./routes/dashboard.route');
const omnitureRoute = require('./routes/omniture.route');
const sitemapRoute = require('./routes/sitemap.route');
const loginRoute = require('./routes/login.route');

const port = process.env.PORT || 3000;
// initialize our express app
const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views/pug"));

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

/**
 * Routes Definitions
 */
app.get("/", loginRoute);
app.get("/login", loginRoute);
app.use('/dashboard', dashboardRoute);
app.use('/omnitures', omnitureRoute);
app.use('/sitemaps', sitemapRoute);
connect();

function connect() {
  mongoose.connection
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', _ => {
      console.log('Database connected:', config.db);
      listen();
    });
  return mongoose.connect(config.db, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

function listen() {
  app.listen(port, () => {
      console.log('Server is up and running on port number ' + port);
  });
}
