const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parametersSchema = new Schema({
  type: {
    type: Schema.Types.String,
    required: true,
    minlength: 5,
    maxlength: 10,
  },
  subType: {
    type: Schema.Types.String,
    required: true,
    maxlength: 20,
  },
  value: {
    tr: {
      type: String,
      required: true,
      maxlength: 50,
    },
    en: {
      type: String,
      required: true,
      maxlength: 50,
    },
  },
  explanation: {
    tr: {
      type: String,
      required: true,
      maxlength: 100,
    },
    en: {
      type: String,
      required: true,
      maxlength: 100,
    },
  },
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  createdBy: {type: String},
  updatedBy: {type: String},
});

parametersSchema.index({type: 1});

parametersSchema.index({
  type: 1,
  subType: 1,
}, {
  unique: true,
});

// Export the model
module.exports = mongoose.model('parameters', parametersSchema);
