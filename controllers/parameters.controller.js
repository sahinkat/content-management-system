const ParametersModel = require('../models/parameters.model');

exports.insertParameter = function(req, res) {
  console.log(req.body);
  const parameters = new ParametersModel(
      {
        type: req.body.type,
        subType: req.body.subType,
        value: req.body.value,
        explanation: req.body.explanation,
      });
  console.log(req.body);
  ParametersModel.create(parameters, function(err, doc) {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    console.log(doc);
    res.send(doc);
  });
};

exports.getPage = async function(req, res) {
  const parameters = await getParameters();
  res.render('parameters', {parameters: parameters});
};

exports.deleteParameter = async function(req, res) {
  deleteOneParameter(req.params._id, res);
};

function getParameters() {
  const parameters = ParametersModel.find();
  return parameters;
}

function deleteOneParameter(_id, res) {
  ParametersModel.deleteOne({'_id': _id},
      function(err, doc) {
        if (err) {
          console.log(err);
          return res.send(err);
        } else {
          return res.send(_id);
        }
      });
}
