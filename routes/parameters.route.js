const express = require('express');
const router = new express.Router();

const parametersController = require('../controllers/parameters.controller');

router.post('/', parametersController.insertParameter);
router.get('/', parametersController.getPage);
module.exports = router;
