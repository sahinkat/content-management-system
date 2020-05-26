const express = require('express');
const router = new express.Router();

const dashboardController = require('../controllers/dashboard.controller');

router.get('/', dashboardController.getPage);
module.exports = router;
