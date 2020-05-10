const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let OmnitureSchema = new Schema({
    name: {type: String, required: true, max: 100},
    sent: {type: Boolean, required: true},
    flowId: {type: Number, min: 0},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createdBy: { type: Number, default: 1 },
    updatedBy: { type: Number, default: 1 }
});

// Export the model
module.exports = mongoose.model('Omniture', OmnitureSchema);
