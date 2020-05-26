const express = require('express');
const router = new express.Router();

const omnitureController = require('../controllers/omniture.controller');

router.get('/', omnitureController.getPage);
router.get('/test', omnitureController.test);
router.get('/table', omnitureController.getTable);
module.exports = router;
