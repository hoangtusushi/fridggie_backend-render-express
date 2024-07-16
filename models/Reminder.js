const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    reminder_type: { type: String, required: true },
    reminder_date: { type: Date, required: true },
    status: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Reminder', reminderSchema);
