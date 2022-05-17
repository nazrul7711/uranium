  const { findOne } = require("../models/bookModel")
  const bookModel = require("../models/bookModel")
  const userModel = require("../models/userModel")
  const mongoose= require('mongoose')

  const isValid = function(value){
    if(typeof value === 'undefined' || value === null) return false
    if(typeof value === 'String' && value.trim().length === 0) return false
    if(typeof value === 'Number' && value.toString().trim().length === 0) return false
    
    return true;
  }

  const isValidRequestBody = function(requestBody){
    return Object.keys(requestBody).length > 0
  }

  const isValidObjectid = function(ObjectId){
    return mongoose.Types.ObjectId.isValid(ObjectId)
  }

  const createBook = async function (req, res) {
    try {
      let requestBody = req.body;

      //if anything is passed in body part by client
      if (!isValidRequestBody(requestBody)) {
        res
          .status(400)
          .send({ status: false, message: `please provide book details` });
        return;
      }

      //Extract params
      let {
        title,
        excerpt,
        userId,
        ISBN,
        category,
        subCategory,
        reviews,
        releasedAt,
        isDeleted,
        deletedAt,
      } = requestBody;

      //validation on title
      if (!isValid(title)) {
        res.status(400).send({ status: false, message: "Title is required" });
        return;
      }

      const isTitleAlreadyInUse = await bookModel.findOne({title})

      if(isTitleAlreadyInUse){
        return res.status(400).send({status:false,message:"Title is already in use"})
      }
      //validation on excerpt
      if (!isValid(excerpt)) {
        res.status(400).send({ status: false, message: "Excerpt is required" });
        return;
      }

      if (!isValid(userId)) {
        res.status(400).send({ status: false, message: "userId is required" });
        return;
      }

      //userId is a valid object ID
      if (!isValidObjectid(userId)) {
        res
          .status(400)
          .send({ status: false, message: "${userId} is not a valid user id" });
        return;
      }

      const isUserIdAlreadyExist = await bookModel.findOne({_id:userId})

      if(!isUserIdAlreadyExist){
        return res.status(400).send({status:false,message:"${userId} is already in use"})
      }



      //to check category is not empty
      if (!isValid(category)) {
        res.status(400).send({ status: false, message: "category is required" });
        return;
      }

      if (!isValid(subCategory)) {
        res.status(400).send({ status: false, message: "sub category is required" });
        return;
      }

      // validation on ISBN
      if (!isValid(ISBN)) {
        res.status(400).send({ status: false, message: "ISBN is required" });
        return;
      }

      const isISBNAlreadyExist = await bookModel.findOne({ISBN:ISBN})

      if(isISBNAlreadyExist){
        return res.status(400).send({status:false,message:"${ISBN} ISBN is already in use"})
      }
      if (!/^([0-9]{3}-[0-9]{10})$/.test(ISBN)) {
        res
          .status(400)
          .send({ status: false, message: "Enter a legit ISBN number" });
        return;
      }

      //validation that review is only a number and that to less than 11
      if(!/^[0-9]+$/.test(reviews)){
        res
          .status(400)
          .send({ status: false, message: "Only numerical values" });
        return;
        
      }
      //reviews will allways be 0 at the start
      reviews = 0

      //so that isDeleted is allways set to false at beginning and deletedAt set to null
      if (isDeleted) {
        isDeleted = false;
      }
      deletedAt = null;

      //new object after running all the validations
      let validatedBookData = {
        title,
        excerpt,
        userId,
        ISBN,
        category,
        reviews,
        releasedAt,
        isDeleted,
        deletedAt,
      };

      //to convert a string to array for the subcategory
      if (subCategory) {
        if (Array.isArray(subCategory)) {
          validatedBookData["subCategory"] = [...subCategory];
        }
        if (Object.prototype.toString.call(subCategory) === "[object String]") {
          validatedBookData["subCategory"] = [subCategory];
        }
      }

      let bookDoc = await bookModel.create(validatedBookData);
      res
        .status(201)
        .send({
          status: true,
          message: "New book created successfully",
          data: bookDoc,
        });
    } catch (err) 
    {
      res.status(500).send({ status: false, data: err.message });
    }
  };

  const getBook = async function (req, res) {

    try {
      //If there is no addtional parameters
      const filterQuery = { isDeleted: false };

      //if there are additional parameters
      let queryParams = req.query;  

      if (isValidRequestBody(queryParams)) {
        //extracting parameters
        const { userId, category, subcategory } = queryParams;

        //running validations
        if (isValid(userId) && isValidObjectid(userId)) {
          filterQuery["userId"] = userId;
        }

        if (isValid(category)) {
          filterQuery["category"] = category.trim();
        }

        //we are supposing client is giving a string of subcategories
        if (isValid(subcategory)) {
          const subcatArr = subcategory
            .trim()
            .split(",")
            .map((subcat) => subcat.trim());
          filterQuery["subcategory"] = { $all: subcatArr };
        }
      }
      //if all good find elements and sort them extract selected param
      const result = await bookModel.find(filterQuery).sort({ title: 1 }).select({
        _id: 1,
        title: 1,
        excerpt: 1,
        userId: 1,
        category: 1,
        reviews: 1,
        releasedAt: 1,
      });

      //return error if no books found
      if (result.length === 0) {
        res
          .status(404)
          .send({ status: false, message: `No such books in our Records` });
        return;
      }

      //if we got what we were looking for
      res.status(200).send({ status: true, message: "Books List", data: result });
    } catch (err) {
      return res.status(500).send({ status: false, data: err.message });
    }
  };


  const bookBookById = async function (req, res) {
    try {
      const bookId = req.params.bookId;
      
      if (!isValidObjectId(bookId)) {
        return res.status(400).send({
            status: false,
            msg: "not a valid bookId"
        })
    }

      const book = await bookModel
        .findById({
          _id: bookId,
          isDeleted: false,
        })

    
      if (!book) {
        return res
          .status(404)
          .send({ status: false, message: "we do not have this book in our record" });
      }

      const booksReview = await reviewModel
        .find({
          bookId: bookId,
          isDeleted: false,
        })
        .select({
          _id: 1,
          bookId: 1,
          reviewedBy: 1,
          reviewedAt: 1,
          rating: 1,
          review: 1,
        });

        const data = book.toObject()
        data['reviewsData'] = booksReview

      

      return res.status(200).send({ status: true,message:'Books List', data:books });
    } catch (err) {
      res.status(500).send({ status: false, data: err.message });
    }
  };

  const updateBookById=async function (req,res) {
    try {
        const bookId=req.params.bookId

        const userId = req.userId

        const data =req.body

        if (!isValidRequestBody(data)) {
          res
            .status(400)
            .send({ status: false, message: `please provide book details for updation` });
          return;
        }


        let {title,ISBN,releasedAt,excerpt}=data
        
        if (!isValidObjectId(bookId)) {
          return res.status(400).send({
              status: false,
              msg: "not a valid bookId"
          })
      }
        if (!isValidObjectId(userId)) {
          return res.status(400).send({
              status: false,
              msg: "not a valid userId"
          })
    }
        //finding book is there or not
        const book=await bookModel.findOne({_id:bookId,isDeleted:false})

        if (!book) {
            return res.status(404).send({status:false,msg:'book not found'})
        }

        if(book.userId.toString() !== userId){
          return res.status(403).send({status:false,message:"sorry u are not authorised to update this record"})
        }

        

        const isUniqueTitle=await bookModel.findOne({title:title})

        if (isUniqueTitle) {
            return res.status(404).send({status:false,msg:'this title already exist,provide unique title'})
        }

        const updatedBookData = {}
        if(isValid(title)){
          if(!Object.prototype.hasOwnProperty.call(updatedBookData,"$set")){
            updatedBookData['$set']={}          
          }
          updatedBookData["$set"]["title"]=title
        }

        const isUniqueISBN=await bookModel.findOne({ISBN:ISBN})

        if (isUniqueISBN) {
            return res.status(404).send({status:false,msg:'this ISBN already exist,provide unique ISBN'})
        }

        if(isValid(excerpt)){
          if(!Object.prototype.hasOwnProperty.call(updatedBookData,"$set")){
            updatedBookData['$set']={}          
          }
          updatedBookData["$set"]["excerpt"]=excerpt
        }

        if(isValid(ISBN)){
          if(!Object.prototype.hasOwnProperty.call(updatedBookData,"$set")){
            updatedBookData['$set']={}          
          }
          updatedBookData["$set"]["ISBN"]=ISBN
        }

        if(isValid(releasedAt)){
          if(!(/^\d{2}([-])\d{2}\1\d{4}$/).test(releasedAt)){
            return res.status(400).send({status:false,msg:'releasedAt date is not in proper format  '})
          }
          if(!Object.prototype.hasOwnProperty.call(updatedBookData,"$set")){
            updatedBookData['$set']={}          
          }
          updatedBookData["$set"]["releasedAt"]=releasedAt
        }

        const updatedBook=await bookModel.findOneAndUpdate({_id:bookId},
          {updatedBookData},{returnNewDocument: true})

        return res.status(200).send({status:true,msg:'updated successfully',data:updatedBook})
      } 
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
    
  }


  const deleteBookById = async function(req, res) {
    try {
        let booksId = req.params.bookId;
        const userIdFromToken = req.userId

        if(!isValidObjectId(booksId)){
          res.status(400)
          .send({status:false
          ,message:`${booksId} is not a valid book id`})
        return
      }
        if(!isValidObjectId(userIdFromToken)){
          res.status(400)
          .send({status:false
          ,message:`${booksId} is not a valid book Id from token`})
        return
      }

        const book= await bookModel.findOne({_id:booksId, isDeleted:false, deletedAt:null})

        if (!book) {
            res.status(404)
            .send({ status: false
            ,message: "no such book exists" });
        }

        if(book.userId.toString() !== userIdFromToken){
          res.status(403)
          .send({status:false
          , message:`You are not suppose to delete this file`});
          return
        }

        await bookModel.findOneAndUpdate({ _id: bookId }, { isDeleted: true }, { returnNewDocument: true});

        res.status(200).send({status: true, data: updatedBook });

    } catch (err) {
        res.status(500).send({ status: false, err: err.message });
    }
  }



module.exports.createBook = createBook
module.exports.getBook = getBook
module.exports.getBookById=getBookById
module.exports.updateBookById = updateBookById
module.exports.deleteBookById = deleteBookById
