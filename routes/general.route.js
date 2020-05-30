const express = require('express');
const router = new express.Router();

const loginRoute = require('./login.route');
const dashboardRoute = require('./dashboard.route');
const omnitureRoute = require('./omniture.route');
const initialRoute = require('./initial.route');

router.get('/', loginRoute);
router.get('/login', loginRoute);
router.use('/dashboard', dashboardRoute);
router.use('/omnitures', omnitureRoute);
router.use('/initial', initialRoute);

module.exports = router;
