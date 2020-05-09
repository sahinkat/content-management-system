const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let OmnitureSchema = new Schema({
    name: {type: String, required: true, max: 100},
    sent: {type: Boolean, required: true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Export the model
module.exports = mongoose.model('Omniture', OmnitureSchema);
