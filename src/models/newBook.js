const mongoose = require('mongoose');
const newPublisher = require('./newPublisher');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
    name: String,
    author: {
        type: ObjectId,
        ref: "newAuthor"
    },
    price: Number,
    ratings:Number,
    publisher:{
        type:ObjectId,
        ref:"newPublisher"
    },
    isHardCover:false   
}, { timestamps: true });


module.exports = mongoose.model('newBook', bookSchema)
