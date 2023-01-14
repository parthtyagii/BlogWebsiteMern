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
        // unique:true
    },
    userId:{
        type:String
    }
});

const USER = new mongoose.model('User', userSchema);
module.exports = USER;





