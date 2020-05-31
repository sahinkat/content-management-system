// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const config = require('./config/development');
// Imports routes

const generalRoute = require('./routes/general.route');

// initialize our express app
const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views/pug'));

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

/**
 * Routes Definitions
 */
app.use('/', generalRoute);

dbConnect();

function dbConnect() {
  mongoose.connection
      .on('error', console.log)
      .on('disconnected', dbConnect)
      .once('open', (_) => {
        console.log('Database connected:', config.db);
        start();
      });
  return mongoose.connect(config.db, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
}

function start() {
  app.listen(config.port, () => {
    console.log('Server is up and running on port number ' + config.port);
  });
}
