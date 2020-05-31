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
  let parameters = await getParameters();
  res.render('parameters', {parameters: parameters});
};

function getParameters(){
  let parameters = ParametersModel.find();
  return parameters;
}
