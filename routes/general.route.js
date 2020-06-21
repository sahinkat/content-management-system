const express = require('express');
const router = new express.Router();

const loginRoute = require('./login.route');
const logoutRoute = require('./logout.route');
const dashboardRoute = require('./dashboard.route');
const omnitureRoute = require('./omniture.route');
const initialRoute = require('./initial.route');
const parametersRoute = require('./parameters.route');

router.use('/', loginRoute);
router.use('/login', loginRoute);
router.use('/logout', logoutRoute);
router.use('/dashboard', dashboardRoute);
router.use('/omnitures', omnitureRoute);


router.use('/parameters', parametersRoute);


router.use('/api/initial', initialRoute);
router.use('/api/parameters', parametersRoute);


module.exports = router;
