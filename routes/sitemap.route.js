const express = require('express');
const router = express.Router();

const sitemapController = require('../controllers/sitemap.controller');

router.get('/', sitemapController.getPage);
router.get('/test', sitemapController.test);
module.exports = router;
