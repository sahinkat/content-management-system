const express = require('express');
const router = express.Router();

const omnitureController = require('../controllers/omniture.controller');

router.get('/', omnitureController.getPage);
router.get('/test', omnitureController.test);
module.exports = router;
