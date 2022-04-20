const { application } = require('express');
const express = require('express');
const router = express.Router();



router.get("/test-me",async function(req,res,next){
  // console.log("hello brother")
  res.send("hello function up")
})
router.get("/india",async function(req,res,next){
  res.send("hello india")
})
router.get("/assam",async function(req,res,next){
  res.send("hello assam")
})

module.exports = router;