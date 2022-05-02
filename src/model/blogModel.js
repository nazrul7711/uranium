const mongoose = require('mongoose')

const BlogsSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    tags: [String],
    category: {
        type: String,
        required: true,
    },
    subcategory: [String],
    isDeleted: {
        type: Boolean,
        default: false
    },
    publishedAt: {
        type: Date,
        default: null
    },
    isPublished: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('BlogsDB', BlogsSchema)
