const express = require('express');
const logger = require('./logger')

const router = express.Router();

let movies =["karan arjun","heena","omkara","titanic","flight"]

let films =[ {
    "id": 1,
    "name": "The Shining"
   }, {
    "id": 2,
    "name": "Incendies"
   }, {
    "id": 3,
    "name": "Rang de Basanti"
   }, {
    "id": 4,
    "name": "Finding Nemo"
   }]
   

router.get('/user-profile/:abcd', function(req, res) {
    console.log(req)
    console.log(req.params.abcd)
    res.send('dummy response')
})

router.get('/test-me', function (req, res) {
    console.log('------------------')
    console.log('------------------')
    console.log('These are the request query parameters: ', req.query)
    res.send('My first ever api!')
});

router.get('/get/movies', function(req, res) {
    res.send(movies)
    res.send('dummy response')
})

router.get('/GET/movies/:id', function(req, res) {
    if(req.params.id > movies.length-1){
        res.send("sorry your requested movie is not in the list")
    }
    res.send(movies[req.params.id])
    res.send('dummy response')
})

router.get('/get/films', function(req, res) {
    res.send(films)
    res.send('dummy response')
})




module.exports = router;
// adding this comment for no reason