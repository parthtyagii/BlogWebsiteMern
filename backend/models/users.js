const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    userImg: {
        type: Object,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
});

const USER = new mongoose.model('User', userSchema);
module.exports = USER;





