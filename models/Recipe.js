const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: [
        {
            name: { type: String, required: true },
            quantity: { type: String, required: true }
        }
    ],
    instructions: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);
