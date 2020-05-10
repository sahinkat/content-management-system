const mongoose = require('mongoose');
const SitemapModel = require('../models/sitemap.model');

const test = new SitemapModel({
    application: 'INT-TR',
    environment: 'TST',
    treeId: 1344,
    name: "Para Transferleri",
    parent: null
});

//Simple version, without validation or sanitation
exports.test = function (req, res) {
  SitemapModel.create(test, function (err, doc) {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    console.log(doc);
    res.send(doc);
  })
};

exports.getPage = function (req, res) {
  res.render("sitemaps");
};
