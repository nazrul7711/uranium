const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const userController= require("../controllers/userController")
const productController = require("../controllers/productController")

const orderController  = require("../controllers/orderController")

const OrderModel= require("../models/orderModel")

const middle = require("../middlewares/commonMiddlewares")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.post("/createUser",middle.headerValidate,userController.createUser)

router.post("/createProduct",productController.createProduct)

router.post("/createOrder",middle.headerValidate,orderController.createOrder)

router.get("/getOrder",async function(req,res){
    let data = await OrderModel.find().populate(["productId","userId"])
    res.send(data)
})


module.exports = router;