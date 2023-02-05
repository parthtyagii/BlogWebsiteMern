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
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;

//---------------------------------------------------------------------------

require('dotenv').config();
cloudinary.config({
    cloud_name: process.env.cloudName,
    api_key: process.env.apiKey,
    api_secret: process.env.apiSecret,
    secure: true
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: "*"
}))
app.use(fileUpload({ useTempFiles: true }));

//---------------------------------------------------------------------------

const URL = process.env.DB_URL || "mongodb://localhost:27017/BlogMERN";

mongoose.set('strictQuery', false);
mongoose.connect(URL, {
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

//------------------------------------------------------------------------------

//for post images upload / delete
app.post('/blog/api/postImg', async (req, res) => {
    try {
        const FILE = req.files.file;
        const response = await cloudinary.uploader.upload(FILE.tempFilePath, { folder: 'postImages' });
        res.json(response);
    }
    catch (e) {
        console.log('cannot upload post image!');
        console.log(e);
    }
})

app.delete('/blog/api/postImg', async (req, res) => {
    try {
        const { id } = req.query;
        const response = await cloudinary.uploader.destroy(id);
        res.json(response);
    }
    catch (e) {
        console.log('cannot delete post image!');
        console.log(e);
    }
})



//for profile image upload / delete
app.post('/blog/api/profileImg', async (req, res) => {
    try {
        const FILE = req.files.file;
        const response = await cloudinary.uploader.upload(FILE.tempFilePath, { folder: 'profileImages' });
        res.json(response);
    }
    catch (e) {
        console.log('cannot upload profile image!');
        console.log(e);
    }
})

app.delete('/blog/api/profileImg', async (req, res) => {
    try {
        const { id } = req.query;
        const response = await cloudinary.uploader.destroy(id);
        res.json(response);
    }
    catch (e) {
        console.log('cannot delete post image!');
        console.log(e);
    }
})




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server 5000 running!");
})