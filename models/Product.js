const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    barcode: { type: String },
    image: String,
    name: { type: String, required: true },
    production_date: { type: Date, required: true },
    expiration_date: { type: Date, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quantity: { type: Number, required: true },
    used_quantity: { type: Number, default: 0 },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
