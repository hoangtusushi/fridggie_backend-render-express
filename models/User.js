const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    bio: String,
    profile_photo: String,
    phone_number: String,
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: {
            type: [Number]
        }
    },
    role: { 
        type: String, 
        enum: ['admin', 'user'], 
        default: 'user' 
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
