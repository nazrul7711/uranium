const req = require("express/lib/request")
const ProductModel= require("../models/productModel")


const createProduct = async function(req, res) {
  data = req.body
  savedData = await ProductModel.create(data)
  res.send({msg:savedData})
}


module.exports.createProduct= createProduct