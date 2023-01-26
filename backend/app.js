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
// app.use('/images', express.static(path.join(__dirname, '/profileImages')));

//---------------------------------------------------------------------------




app.listen(5000, () => {
    console.log("Server 5000 running!");
})