const req = require("express/lib/request")
const OrderModel= require("../models/orderModel")
const mongoose = require('mongoose');
const productModel = require("../models/productModel");
const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
// const ObjectId = mongoose.Schema.Types.ObjectId
var ObjectID = require("mongodb").ObjectID


const createOrder = async function(req, res) {
  data = req.body
  if(data["userId"]!=undefined && data["productId"]!=undefined && mongoose.isValidObjectId(data["userId"]) && mongoose.isValidObjectId(data["productId"])){
    let useId = await OrderModel.find({userId : data["userId"]})
    let proId =  await productModel.find({productId:data["productId"]})

    if(useId == null || proId == null){
      res.send("sorry dear there is no such user in our record")
    }
  }else{
    res.send("invalid input")
  }
  //scenario 1 paid user app and the user has sufficient balance
  let id =data["userId"]
  let bal = await userModel.find({_id:id}).select("balance")
  bal=bal[0]["balance"]
  // console.log(typeof req.headers["isfreeappuser"])
  if(req.headers["isfreeappuser"]=="true"){
    data.amount = 0
  }else{
    if(bal>data.amount){
      bal=bal-data.amount
      let update1=await userModel.updateOne({_id:id},{balance:bal})
    }else{
      res.send("user doest have sufficient balance")
    }
  }
  
  savedData = await OrderModel.create(data)
  res.send({msg:savedData})
}


module.exports.createOrder= createOrder