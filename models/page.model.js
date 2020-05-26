const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageSchema = new Schema({
  pageId: {type: Schema.Types.Decimal128, required: true},
  pathId: {type: Schema.Types.Decimal128, required: true},
  pageName: {
    tr: {type: String, required: true, maxlength: 100},
    en: {type: String, required: true, maxlength: 100},
  },
  application: {
    name: {type: String, required: true, enum: ['INT-TR', 'MOB-TR']},
    siteCode: {type: String, required: true, enum: ['B', 'T']},
  },
  pageOrderNum: {type: Number, required: true, max: 100, default: 1},
  messageText: {
    tr: {type: String},
    en: {type: String},
  },
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  createdBy: {type: String},
  updatedBy: {type: String},
});

// Export the model
module.exports = mongoose.model('page', pageSchema);
