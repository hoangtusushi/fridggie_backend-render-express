const mongoose = require('mongoose');

const exchangeSchema = new mongoose.Schema({
    offering_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiving_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    status: { type: String, required: true },
    location: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true }
    },
}, { timestamps: true });

module.exports = mongoose.model('Exchange', exchangeSchema);
