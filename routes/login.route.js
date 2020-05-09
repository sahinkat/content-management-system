const express = require('express');
const router = express.Router();

const loginController = require('../controllers/login.controller');

router.get('/', loginController.getPage);
module.exports = router;
