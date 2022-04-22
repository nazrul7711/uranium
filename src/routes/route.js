const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const userController= require("../controllers/userController")
const middle = require("../../middleware/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId",middle.auth, userController.getUserData)

router.put("/users/:userId",middle.auth, userController.updateUser)

router.delete("/users/:userId",middle.auth, userController.deleteUser)

module.exports = router;