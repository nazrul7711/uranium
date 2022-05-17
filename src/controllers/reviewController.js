const userModel = require("../models/userModel")
const bookModel = require("../models/bookModel")
const reviewModel = require("../models/reviewModel")
const mongoose = require("mongoose");

const isValid = function(value){
    if(typeof value === 'undefined' || value === null) return false
    if(typeof value === 'String' && value.trim().length === 0) return 
    false
    if(typeof value === 'Number' && value.toString().trim().length === 0) return 
    false
    
    return true;
  }

const isValidObjectId = function(ObjectId){
  return mongoose.Types.ObjectId.isValid(ObjectId)
}

const isValidRequestBody = function(requestBody){
  return Object.keys(requestBody).length > 0
}

const numberRegex = /\d+/

const createReview = async function(req, res){
    try {
        const bookId = req.params.bookId
        const details = req.body

        if(!isValidRequestBody(details)){
          res.status(400).send({status:false, message:'Invalid request parameters. Please provide review details'})
          return
      }        

      if (!isValidObjectId(bookId)) {
        return res.status(400).send({
            status: false,
            msg: "not a valid bookId"
        })
    }

        const bookDetail = await bookModel.findOne({_id:bookId, isDeleted:false})

        if(!bookDetail){
            return res.status(400).send({status:false,message:"book does not exist"})
        }

        const {reviews, rating, reviewedBy}= details

        if(!isValid(reviewedBy)){
          res.status(400).send({status:false, message:`reviewers name is required`})
          return
      }

        if(!isValid(reviews)){
            res.status(400).send({status:false, message:`review is required`})
            return
        }

        if(!isValid(rating)){
            res.status(400).send({status:false, message:`rating  is required`})
            return
        }
        if(!numberRegex.test(rating)){
            res.status(400).send({status:false, message:`rating  is required`})
            return
        }

        if(rating<1){
            return res.status(400).send({status:false, message:"plz give rating min 1"})
        }

        if(rating>5){
            return res.status(400).send({status:false, massenge:"plz give a rating not greater than   5"})
        }
        
        let reviewDetails = {bookId,reviewedBy,rating,reviews}
        reviewDetails.reviewedAt = new Date()

        await reviewModel.create(reviewDetails)

        bookDetail.reviews = bookDetail + 1
        await bookDetail.save()

        const data = bookDetail.toObject()
        data['reviewsData']=reviewDetails
        
        // const reviewCount = await bookModel.findOneAndUpdate({_id:bookId},{$inc:{reviews:1}},{new:true})
        res.status(201).send({status:true,message:"review added successfully", data: reviewCount})
    } catch (err) {
        res.status(500).send({ status: false, data: err.message });
    }
}

    //PUT /books/:bookId/review/:reviewId
const updateReview = async function(req, res){
    try {
        const bookId = req.params.bookId

        if(!isValid(bookId)){
                return res.status(400).send({status : false, msg : "BookId is needed"})
          }

          if (!isValidObjectId(bookId)) {
            return res.status(400).send({
                status: false,
                msg: "Not a valid bookId"
            })
        }
        const book = await bookModel.findOne({_id:bookId,isDeleted:false})

        if(!book){
            return res.status(400).send({status:false, message:" No such Book"})
        }

        const reviewId = req.params.reviewId

        if(!isValid(reviewId)){
          return res.status(400).send({status : false, msg : "reviewId is needed"})
    }

    if (!isValidObjectId(reviewId)) {
      return res.status(400).send({
          status: false,
          msg: "Not a valid reviewId"
      })
  }
        const reviewExist = await reviewModel.findOne({_id:reviewId,bookId:bookId,isDeleted:false})

        const data = book.toObject()
        data['reviewsData']=reviewExist

        const receivedData= req.body
        
        if(!isValidRequestBody(receivedData)){
          res.status(400).send({status:false, message:'Invalid request parameters. Please provide review details'})
          return
      }

      let{review, rating, reviewedBy}=receivedData

      const updatedReviewData = {}

      if(!isValid(rating)){
          if(numberRegex.test(rating)){
              return res.status(400).send({status:false,message:"Rating should be a valid Number"})
          }
          if(rating<1){
            return res.status(400).send({status:false, message:"plz give rating min 1"})
        }

        if(rating>5){
            return res.status(400).send({status:false, massenge:"plz give a rating not greater than   5"})
        }
        if(!Object.prototype.hasOwnProperty.call(updatedReviewData,"$set")){
            updatedReviewData["$set"]['rating'] = rating
        }       
  }
    if(isValid(reviewedBy)){
        if(!Object.prototype.hasOwnProperty.call(updatedReviewData,"$set")){
        updatedReviewData["$set"]['reviewedBy'] = reviewedBy
        }
    }
        updatedReviewData['$set']['reviewedAt'] = new Date()

        const updatedReview = await reviewModel.findOneAndUpdate({_id:reviewId},updatedReviewData)

        data['reviewsData'] = updatedReview

        return res.status(200).send({status:true,message:"Success", data:data})
    } catch (err) {  
        res.status(500).send({ status: false, data: err.message });
    }
}
const deleteReview = async function(req,res){
    try {
        const bookId = req.params.bookId
        const reviewId = req.params.reviewId
        if(!isValidObjectId(bookId)){
            return res.status(400).send({status:false, message:"Plz enter a valid bookId"})
        }
        if(!isValidObjectId(reviewId)){
            return res.status(400).send({status:false, message:"plz enter a valid reviewId"})
        }
        const book = await bookModel.findOne({_id:bookId, isDeleted:false})
        
        if(!book){
            return res.status(400).send({status:false, message:"Book not Found"})
        }
        const review = await reviewModel.findOne({_id:reviewId,isDeleted:false});
        
        if(!review){
            return res.status(400).send({status:false, message:"review not found"})
        }

        await reviewModel.findOneAndUpdate({_id:reviewId}),{$set:{isDeleted:true,deletedAt:new Date()}}

        book.reviews = book.reviews === 0 ? 0 : book.reviews - 1

        await book.save()

        return res.status(200).send({status: true,message:"Success"})
    } catch (err) {
        res.status(500).send({ status: false, data: err.message });
    }
}


module.exports.createReview=createReview
module.exports.updateReview=updateReview
module.exports.deleteReview=deleteReview