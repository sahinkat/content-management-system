const mongoose = require('mongoose');
const OmnitureModel = require('../models/omniture.model');

const test = new OmnitureModel({ name: 'sahin', sent: true, flowId: 5 });

//Simple version, without validation or sanitation
exports.test = function (req, res) {
  OmnitureModel.create(test, function (err, doc) {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    console.log(doc);
    res.send(doc);
  })
};

exports.getPage = function (req, res) {
  res.render("omnitures");
};

exports.getTable = function (req, res) {
  res.render("omnitureTableContent");
};
