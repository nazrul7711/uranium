const authorModel = require('../model/authorModel')
const jwt = require("jsonwebtoken")

const authorLogin=async function(req,res){

    let email=req.body.email
    let password =req.body.password

    let author = await authorModel.findOne({email:email,password:password})
    if (!author){
        return res.send({status:false,msg:"username or the password is not correct"})
    }
    let token = jwt.sign({userId:author._id.toString(),
    batch:"Uranium",
    organisation:"FunctionUp",},
    "functionUp-Uranium"
    )
    res.setHeader("auth-token",token)
    res.send({status:true,data:token}) 
}
    

    

const createAuthor = async function(req,res) {
    try {
        let authorData = req.body
        let saveAuthor = await authorModel.create(authorData)
        res.status( 201 ).send({saveAuthor})
    }
    catch(error) {
        res.status( 500 ).send({msg: error.message})
    }
}



module.exports.createAuthor = createAuthor
module.exports.authorLogin = authorLogin