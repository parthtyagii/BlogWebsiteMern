const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');
const userRoute = require('./routes/user');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

//---------------------------------------------------------------------------

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: "*"
}))

//---------------------------------------------------------------------------

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/BlogMERN", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(res => {
        console.log('Mongoose connected!');
    })
    .catch(e => {
        console.log('Mongoose not connected!');
        console.log(e);
    })

//---------------------------------------------------------------------------

app.use('/blog/api/auth', authRoute);
app.use('/blog/api/posts', postsRoute);
app.use('/blog/api/user', userRoute);
app.use('/profileImages', express.static(path.join(__dirname, '/profileImages')));
app.use('/postImages', express.static(path.join(__dirname, '/postImages')));

//---------------------------------------------------------------------------

const postStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'postImages');
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
});

const profileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'profileImages');
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
});



const postUpload = multer({ storage: postStorage });
const profileUpload = multer({ storage: profileStorage });

app.post('/blog/api/postImg', postUpload.single('file'), async (req, res) => {
    res.json('post image has been uploaded!');
})

app.delete('/blog/api/postImg/:id', async (req, res) => {
    const { id } = req.params;
    fs.unlink(`./postImages/${id}`, (err) => {
        if (err) {
            res.status(500).send({ message: 'Failed to delete post image' });
            return;
        }
        res.send({ message: 'post image deleted successfully' });
    });
})




app.post('/blog/api/profileImg', profileUpload.single('file'), async (req, res) => {
    res.json('profile image has been uploaded!');
})

app.delete('/blog/api/profileImg/:id', async (req, res) => {
    const { id } = req.params;
    fs.unlink(`./profileImages/${id}`, (err) => {
        if (err) {
            res.status(500).send({ message: 'Failed to delete profile image' });
            return;
        }
        res.send({ message: 'profile image deleted successfully' });
    });
})






app.listen(5000, () => {
    console.log("Server 5000 running!");
})