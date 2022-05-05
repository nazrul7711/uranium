const mongoose = require("mongoose")



const collegeSchema = new mongoose.Schema({

    "name" : {
        type : String,
        required : [true, "Collegename is required"],
        unique: [true, "Collegename is already used"],
        lowercase : true,
        trim: true
        
    },
    "fullName" : {
        type : String,
        required : [true , "fullName is required"],
        unique : [true, "Data already exists with this name"],
        trim:true

    },
    "logoLink" : {
        type : String,
        required : [true , "logolink is required"],
        trim : true
    },
    "isDeleted" :{
        type : Boolean,
        default : false
}
}, { timestamps: true })

module.exports = mongoose.model("College", collegeSchema)