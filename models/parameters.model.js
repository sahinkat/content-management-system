const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @swagger
 *  components:
 *    schemas:
 *      Parameters:
 *        type: object
 *        required:
 *          - type
 *          - subType
 *          - value
 *        properties:
 *          type:
 *            type: string
 *          subType:
 *            type: string
 *            description: Email for the user, needs to be unique.
 *          value:
 *            type: object
 *          explanation:
 *            type: object
 *        example:
 *           type: abcd
 *           subType: defg
 *           value: {tr:qwer}
 *           explanation: {tr:qwer}
 */

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
