// const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const blogController = require("../controller/blogController");
const authorController = require('../controller/authorController')
// const middleWare = require("../middleware/middy")
const jwt = require("jsonwebtoken")


const tokenValidator = async function (req, res, next) {
  
  try {
      let token = req.headers["x-Auth-token"]
      if (!token) token = req.headers["x-auth-token"]
      

      if (!token) return res.status(401).send({ status: false, msg: "Token must be present" })

      let decodedToken = jwt.verify(token, "functionUp-Uranium")
      if (!decodedToken) {
          return res.status(401).send({ status: false, msg: "token is invalid" })
      }
      next()
  }
  catch (error) {
      res.status(500).send(error.message)
  }
}






router.get("/getBlogs",tokenValidator, blogController.getBlogs)
router.put("/updateBlog/:blogId",blogController.updateBlog)
router.delete("/deleteBlog/:blogId",blogController.deleteBlogByBlogId)
router.delete("/deleteBlogByParams",blogController.deleteBlogByParam)
router.post("/createBlog",blogController.createBlogs)
router.post("/createAuthor",authorController.createAuthor)
router.post("/authorLogin",authorController.authorLogin)






module.exports = router;