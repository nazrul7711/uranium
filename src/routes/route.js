const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const middy=require("../middleware/auth")

router.get("/test-me", function (req, res) {
    let data =req.body.hello
    res.send({msg:data})
})


router.post("/users", userController.createUser)

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId",middy.validateToken, userController.getUserData)
router.post("/users/:userId/posts", userController.postMessage)

router.put("/users/:userId",userController.updateUser)
router.delete('/users/:userId', userController.deleteUser)

module.exports = router;