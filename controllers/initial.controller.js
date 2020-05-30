const TPathDefinitionVirtual = require('../data/T_path_definition_virtual');
const TFunctionDisable = require('../data/T_function_disable');
const TFunctionMessage = require('../data/T_function_message');
const FunctionDefinitionVirtual = require('../data/FunctionDefinitionVirtual');

const _ = require('lodash');

exports.loadData = function(req, res) {
  const bulkData = [];
  const pathDataArray = TPathDefinitionVirtual.getData().Sheet1;
  const pathDisabledDataArray = TFunctionDisable.getData().Sheet1;
  const pathMessageDataArray = TFunctionMessage.getData().Sheet1;
  const pathDefinitionArray = FunctionDefinitionVirtual.getData().Sheet1;

  pathDataArray.forEach((pathData) => {
    const messageTextData = [];
    const messageTextDataOldArray = _.filter(pathMessageDataArray,
        {
          'function_num': pathData.function_id,
          'site_code': pathData.site_code,
        });
    const pathDefinition = _.find(pathDefinitionArray,
        {'functionID': pathData.function_id, 'site_code': pathData.site_code});
    const pathDisabledData = _.find(pathDisabledDataArray,
        {'function_id': pathData.function_id, 'site_code': pathData.site_code});
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
        tst: pathDefinition && parseInt(pathDefinition.test_existance_ind) ?
        true : false,
        prd: pathDefinition &&
        parseInt(pathDefinition.production_existance_ind) ? true : false,
      },
      menuDisabledInd: pathDisabledData &&
      parseInt(pathDisabledData.menu_disable_ind) ? true : false,
      messageText: messageTextData,
      createdAt: pathData.create_date,
      updatedAt: pathData.create_date,
      createdBy: pathData.create_user_id,
      updatedBy: pathData.create_user_id,
    });
  });

  /* OmnitureModel.create(test, function(err, doc) {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    console.log(doc);
    res.send(doc);
  });*/
  res.send(bulkData);
};
