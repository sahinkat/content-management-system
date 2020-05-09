const mongoose = require('mongoose');
const OmnitureModel = require('../models/omniture.model');

const test = new OmnitureModel({ name: 'sahin', sent: true })

//Simple version, without validation or sanitation
exports.test = function (req, res) {
  OmnitureModel.create(test, function (err, doc) {
    if (err) { return console.error(err) }
    console.log(doc)
    res.send('Greetings from the Test controller!');
  })
};

exports.getPage = function (req, res) {
  res.render("omnitures");
};
