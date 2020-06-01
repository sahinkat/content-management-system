// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const config = require('./config/development');
// Imports routes

const generalRoute = require('./routes/general.route');

// Swagger set up
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Modul Mesaj",
      version: "1.0.0",
      description:
        "Modul mesaj uygulaması api test",
      contact: {
        name: "Dijital Bankacılık",
        url: "https://swagger.io",
        email: "Info@SmartBear.com"
      }
    },
    servers: [
      {
        url: "http://localhost:3000/"
      }
    ]
  },
  apis: ["./models/parameters.model.js", "./routes/parameters.route.js"]
};
const specs = swaggerJsdoc(options);

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
app.use("/docs", swaggerUi.serve);
app.get(
  "/docs",
  swaggerUi.setup(specs, {
    explorer: true
  })
);

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
