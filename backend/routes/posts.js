const router = require('express').Router();
const POST = require('../models/posts');

//create post...
router.post('/', async (req, res) => {
    try {
        const { username, title, desc, postId, postImg, userId, postDate } = req.body;
        const post = new POST({ username, title, desc, postId, postImg, userId, postDate });
        await post.save();

        res.json(post);
    }
    catch (e) {
        console.log('cannot create post!');
        console.log(e);
    }
})

//update post...
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await POST.findOne({ postId: id });
        post.title = req.body.title;
        post.desc = req.body.desc;
        await post.save();

        res.json(post);
    }
    catch (e) {
        console.log('cannot update post!');
        console.log(e);
    }
})


//delete post...
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await POST.findOneAndDelete({ postId: id });

        res.json();
    }
    catch (e) {
        console.log('cannot delete post!');
        console.log(e);
    }
})

// get post...
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await POST.findOne({ postId: id });

        res.json(post);
    }
    catch (e) {
        console.log('cannot get post!');
        console.log(e);
    }
})


//all posts..
router.get('/', async (req, res) => {
    try {
        const posts = await POST.find({});

        res.json(posts);
    }
    catch (e) {
        console.log('cannot get all post!');
        console.log(e);
    }
})



module.exports = router;