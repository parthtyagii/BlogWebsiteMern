const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');
const userRoute = require('./routes/user');

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
app.use('./blog/api/posts', postsRoute);


















app.listen(5000, () => {
    console.log("Server 5000 running!");
})