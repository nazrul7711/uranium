const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    console.log(Date.now(),req.ip,req.url)
    next()
});

mongoose.connect("mongodb+srv://functionUp:dizAzSvhHkzo2rlO@cluster0.wew6u.mongodb.net/reference", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);

// app.use(function (req,res,next){
//     console.log("hello brother")
//     next()
// })


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
