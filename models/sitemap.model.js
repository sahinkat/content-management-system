const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SitemapSchema = new Schema({
    application: {type: String, enum: ['INT-TR', 'MOB-TR']},
    environment: {type: String, enum: ['TST', 'PRD']},
    treeId: {type: Number, required: true},
    name: {type: String, required: true, max: 100},
    parent: {type: Number},
    order: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createdBy: { type: Number, default: 1 },
    updatedBy: { type: Number, default: 1 }
});

SitemapSchema.index({'application': 1, 'environment': 1, 'treeId': 1}, {unique: true});

// Export the model
module.exports = mongoose.model('Sitemap', SitemapSchema);
