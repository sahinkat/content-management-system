const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pathSchema = new Schema({
  pathId: {type: Schema.Types.Decimal128, required: true},
  parentPathId: {type: Schema.Types.Decimal128, required: true},
  pathName: {
    tr: {type: String, required: true, maxlength: 100},
    en: {type: String, required: true, maxlength: 100},
  },
  application: {
    name: {type: String, required: true, enum: ['INT-TR', 'MOB-TR']},
    siteCode: {type: String, required: true, enum: ['B', 'T']},
  },
  menuOrderNum: {type: Number, required: true, max: 100, default: 1},
  newIndStartDate: {type: Date},
  newIndEndDate: {type: Date},
  existance: {
    tst: {type: Boolean},
    prd: {type: Boolean},
  },
  menuDisabledInd: {type: Boolean},
  messageText: [{
    code: {type: String, required: true},
    lang: {type: String, required: true, enum: ['TR', 'EN']},
    text: {type: String},
  }],
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  createdBy: {type: String},
  updatedBy: {type: String},
});

// Export the model
module.exports = mongoose.model('path', pathSchema);
