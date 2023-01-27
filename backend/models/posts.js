const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    postImg: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    postDate: {
        type: String,
        required: true
    }
});

const POST = new mongoose.model('Post', postsSchema);
module.exports = POST;