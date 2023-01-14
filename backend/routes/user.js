const router = require('express').Router();
const USER = require('../models/users');

//get user...
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await USER.findOne({ userId: id });

        res.json(user);
    }
    catch (e) {
        console.log('cannot get user!');
        console.log(e);
    }
})

//update user...
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await USER.findOne({ userId: id });
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;
        await user.save();

        res.json("Updated!");
    }
    catch (e) {
        console.log('cannot update user!');
        console.log(e);
    }
});

//delete user...
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await USER.findOneAndDelete({ userId: id });

        return res.json('Deleted!');
    }
    catch (e) {
        console.log('cannot delete user!');
        console.log(e);
    }
})














module.exports = router;