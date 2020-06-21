// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cookieSession = require('cookie-session');
const passport = require('passport');
const CustomStrategy = require('passport-custom').Strategy;
const { authenticate } = require('ldap-authentication');

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
/**
 * Create the passport custom stragegy and name it `ldap`
 *
 * Only this part is where we use ldap-authentication to do
 * the authentication.
 *
 * Everything else in this example is standard passport staff.
 *
 */
passport.use('ldap', new CustomStrategy(
  async function (req, done) {
    try {
      if (!req.body.username || !req.body.password) {
        throw new Error('username and password are not provided')
      }
      // construct the parameter to pass in authenticate() function
      let ldapBaseDn = config.ldap.dn
      let options = {
        ldapOpts: {
          url: config.ldap.url
        },
        // note in this example it only use the user to directly
        // bind to the LDAP server. You can also use an admin
        // here. See the document of ldap-authentication.
        userDn: `uid=${req.body.username},${ldapBaseDn}`,
        userPassword: req.body.password,
        userSearchBase: ldapBaseDn,
        usernameAttribute: 'uid',
        username: req.body.username
      }
      // ldap authenticate the user
      let user = await authenticate(options);
      // success
      done(null, user);
    } catch (error) {
      // authentication failure
      done(error, null);
    }
  }
));

// passport requires this
passport.serializeUser(function (user, done) {
  done(null, user);
});
// passport requires this
passport.deserializeUser(function (user, done) {
  done(null, user);
});
// passport requires a session
var sessionMiddleWare = cookieSession({
  name: 'session',
  keys: ['keep the secret only to yourself'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
});

app.use(sessionMiddleWare);
// passport requires these two
app.use(passport.initialize());
app.use(passport.session());

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

// user post username and password
app.post('/login', function(req, res, next) {
  passport.authenticate('ldap', function(err, user, info) {
    if (err) {
      return res.redirect('/login');
    }
    if (!user) {
      return res.redirect('/login');
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/dashboard');
    });
  })(req, res, next);
});

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
