const mongoose = require("mongoose")
const moment = require("moment")
const ObjectId = mongoose.Schema.Types.ObjectId


// let date = moment().format('DD/MM/YYYY');
// console.log(date)


const internSchema = new mongoose.Schema({


    name: {
        type: String,
        required: [true, "name is mandatory"],
        trim :true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function (email) {
                return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email address is required"]
    },
    // /^(\+\d{1,3}[- ]?)?\d{10}$/
    // ^[0-9]{10}$   ,,   ^[2-9]\d{9}$
    // ^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$
    mobile: {
        type: String,
        trim: true,
        unique: [true,"This number is already registered"],
        validate: {
            validator: function (mobile) {
                return  /^[2-9]\d{9}$/.test(mobile);
            },
            message: "Please enter a valid number"
        },
        required: [true, "Mobile number is mandatory"]
    },

    collegeId: {
        type: "ObjectId",
        ref: "College",
        trim: true

    },

    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model("Intern", internSchema)












