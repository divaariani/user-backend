const mongoose = require('mongoose');

const generateUniqueID = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uniqueID = '';

    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        uniqueID += characters.charAt(randomIndex);
    }

    return uniqueID;
};

const userSchema = mongoose.Schema({
    id: {
        type: String,
        default: generateUniqueID,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    registered_on: {
        type: Date,
        default: new Date(),
    },
});

var userdata = mongoose.model('userdata', userSchema);
module.exports = userdata;