const { default: mongoose } = require("mongoose")
const authorModel = require("../models/newAuthor")
const bookModel= require("../models/newBook")
const { findOneAndUpdate } = require("../models/newPublisher")
const publisherModel = require("../models/newPublisher")

// const createBook= async function (req, res) {
//     let book = req.body
//     if((!book.author)||(!book.publisher)){
//         return res.send("sorry u forgot to enter either authorId or publisherId")
//     }
//     let authorid = book.author
//     let publisherId = book.publisher
//     if(mongoose.isValidObjectId(authorid) && (mongoose.isValidObjectId(publisherId))){
//         let authorInAuthor = await authorModel.findOne({_id:authorid})
//         let publisherInpublisher = await publisherModel.findOne({_id:publisherId})
//         if(authorInAuthor==null){
//             res.send("sorry we have no author with this id")
//         }else if(publisherInpublisher==null){
//             res.send("sorry we have no publisher with this id")
//         }
//         else{
//             let bookCreated = await bookModel.create(book)
//             res.send({data: bookCreated})
//         }
//     }else{
//         res.send("sorry the id is invalid")
//     }
    
// }

// const getBooksWithAuthorDetails = async function (req, res) {
//     let specificBook = await bookModel.find().populate({path:"author",select:"authorName"}).populate({path:"publisher",select:"name"})
//     res.send({data: specificBook})

// }

// const updateBooks = async function(req,res){
//     // let data = req.body
//     let modifiedData=await bookModel.findOneAndUpdate({name:"Train to Pakistan"},{isHardCover:true},{upsert:true})
//     let priceData = await bookModel.update({ratings:{$gt:3.5}},{$inc:{price:10}})
//     res.send("succeeded")
// }

// const middleware=async function(req,res){
//     let data = req.url
//     let ip = req.ip
//     res.send({msg:data})
// }


// module.exports.middleware=middleware
// module.exports.createBook= createBook
// module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
// module.exports.updateBooks = updateBooks
