const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    points_earned: { type: Number, required: true },
    points_redeemed: { type: Number, default: 0 },
    point_source: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Point', pointSchema);
