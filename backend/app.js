const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');
const userRoute = require('./routes/user');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

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

app.post('/blog/api/profileImg', profileUpload.single('file'), async (req, res) => {
    console.log(req.file);
    res.json('profile image has been uploaded!');
})






app.listen(5000, () => {
    console.log("Server 5000 running!");
})