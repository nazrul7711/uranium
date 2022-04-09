const express = require('express');

const router = express.Router();

let players =
   [
       {
           "name": "manish",
           "dob": "1/1/1995",
           "gender": "male",
           "city": "jalandhar",
           "sports": [
               "swimming"
           ]
       },
       {
           "name": "gopal",
           "dob": "1/09/1995",
           "gender": "male",
           "city": "delhi",
           "sports": [
               "soccer"
           ],
       },
       {
           "name": "lokesh",
           "dob": "1/1/1990",
           "gender": "male",
           "city": "mumbai",
           "sports": [
               "soccer"
           ],
       },
   ]
 
router.post('/players', function(req, res) {
    let data =  req.body
    function pushPlayers(sth){
        for( let a of players){
            if(a["name"] == sth["name"]){
                return
            }
        }
        players.push(sth)
    }
    pushPlayers(data)
    
    res.send({data:players,status:true})
})   


module.exports = router;
// adding this comment for no reason