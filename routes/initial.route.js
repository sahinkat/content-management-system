const express = require('express');
const router = new express.Router();

const initialController = require('../controllers/initial.controller');

router.get('/load', initialController.loadData);
module.exports = router;
