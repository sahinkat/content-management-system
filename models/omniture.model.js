const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const omnitureSchema = new Schema({
  pageId: {type: Schema.Types.Decimal128, required: true},
  application: {
    name: {type: String, required: true, enum: ['INT-TR', 'MOB-TR']},
    siteCode: {type: String, required: true, enum: ['B', 'T']},
  },
  existance: {type: Boolean},
  variableCode: {type: String, maxlength: 20},
  keyCode: {type: String, maxlength: 20},
  messageText: {
    tr: {type: String, maxlength: 300},
    en: {type: String, maxlength: 300},
  },
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  createdBy: {type: String},
  updatedBy: {type: String},
});

// Export the model
module.exports = mongoose.model('omniture', omnitureSchema);
