const OmnitureModel = require('../models/omniture.model');
const T_path_definition_virtual = require('../data/T_path_definition_virtual');
const T_function_disable = require('../data/T_function_disable');
const T_function_message = require('../data/T_function_message');
const FunctionDefinitionVirtual = require('../data/FunctionDefinitionVirtual');

const _ = require('lodash');

exports.loadData = function(req, res) {
  let bulkData = [];
  let pathDataArray = T_path_definition_virtual.getData().Sheet1;
  let pathDisabledDataArray = T_function_disable.getData().Sheet1;
  let pathMessageDataArray = T_function_message.getData().Sheet1;
  let pathDefinitionArray = FunctionDefinitionVirtual.getData().Sheet1;

  pathDataArray.forEach((pathData) => {
    let messageTextData = [];
    let messageTextDataOldArray = _.filter(pathMessageDataArray, {'function_num':pathData.function_id, 'site_code':pathData.site_code});
    let pathDefinition = _.find(pathDefinitionArray, {'functionID':pathData.function_id, 'site_code':pathData.site_code});
    messageTextDataOldArray.forEach((messageTextDataOld) => {
      messageTextData.push({
        code: messageTextDataOld.function_code,
        lang: messageTextDataOld.language_code,
        text: messageTextDataOld.message_text,
      });
    });
    bulkData.push({
      pathId: pathData.function_id,
      parentPathId: pathData.main_function_id,
      pathName: {
        tr: pathDefinition ? pathDefinition.functionName : null,
        en: pathDefinition ? pathDefinition.translationFunctionName : null,
      },
      application: {
        name: 'INT-TR',
        siteCode: pathData.site_code,
      },
      menuOrderNum: pathData.menu_order_num,
      newIndStartDate: pathData.new_ind_start_date,
      newIndEndDate: pathData.new_ind_end_date,
      existance: {
        tst: pathDefinition ? pathDefinition.test_existance_ind : null,
        prd: pathDefinition ? pathDefinition.production_existance_ind : null,
      },
      menuDisabledInd: _.find(pathDisabledDataArray, {'function_id':pathData.function_id, 'site_code':pathData.site_code}),
      messageText: messageTextData,
      createdAt: pathData.create_date,
      updatedAt: pathData.create_date,
      createdBy: pathData.create_user_id,
      updatedBy: pathData.create_user_id,
    });
  });

  /*OmnitureModel.create(test, function(err, doc) {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    console.log(doc);
    res.send(doc);
  });*/
  res.send(bulkData);
};
