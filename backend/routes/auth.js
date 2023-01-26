const router = require('express').Router();
const USER = require('../models/users');

//registration...
router.post('/registration', async (req, res) => {
    try {
        const { username, email, password, userId, userImg } = req.body;
        const user = new USER({ username, email, password, userId, userImg });
        await user.save();

        return res.status(200).json(user);
    }
    catch (e) {
        console.log('cannot register!');
        console.log(e);
    }
});


//login...
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await USER.findOne({ username, password });
        if (!user) {
            return res.json('Wrong credentials!');
        }
        return res.json(user);
    }
    catch (e) {
        console.log('cannot login!');
        console.log(e);
    }
});


module.exports = router;
