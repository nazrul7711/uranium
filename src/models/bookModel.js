const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const bookSchema = new mongoose.Schema( {
    title: {
        type:String,
        unique:true,
        required:true
    },
    excerpt:{
        type:String,
        required:true
    },
    userId:{
        type:ObjectId,
        ref:"User",
        required:true,
        trim:true
    },
    ISBN: {
        type: String,
        unique:true,
        required:true,
        trim:true
    },
    category:{
        type:String,
        required:true,
        trim:true
    },
    subCategory:{
        type:[String],
        required:true,
        trim:true
    },
    reviews:{
        type:Number,
        required:true,
        default:0,
    },
    deletedAt: {
        type: Date,
      },
    isDeleted:{
        type:Boolean,
        default:false
    },
    releasedAt: {
        type: Date,
        required:true,
      },
},{timestamps:true});

module.exports = mongoose.model('Book', bookSchema)