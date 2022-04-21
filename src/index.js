const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://functionUp:dizAzSvhHkzo2rlO@cluster0.wew6u.mongodb.net/middleware2", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

// app.use(function(req, res, next) {
//     console.log('This is a global middleware')
//     //Adding a property in request object
//     req['current-day'] = 'Wednesday'
//     next()
// })

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
