const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');
const userRoute = require('./routes/user');
const cors = require('cors');

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

//---------------------------------------------------------------------------

// app.get('/blog/api/aboutUser', async (req, res) => {
//     try {
//         if (req.session.user) {
//             return res.json(req.session.user);
//         }
//     }
//     catch (e) {
//         console.log('cannot get aboutUser');
//         console.log(e);
//     }
// });



app.listen(5000, () => {
    console.log("Server 5000 running!");
})