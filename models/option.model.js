const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionSchema = new Schema({
  type: {type: String, required: true, maxlength: 20},
  subType: {type: String, required: true, maxlength: 20},
  value: {type: String, maxlength: 20},
  messageText: {
    tr: {type: String, maxlength: 100},
    en: {type: String, maxlength: 100},
  },
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  createdBy: {type: String},
  updatedBy: {type: String},
});

// Export the model
module.exports = mongoose.model('option', optionSchema);
