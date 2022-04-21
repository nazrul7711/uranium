
const headerValidate = function(req,res,next){
    console.log("hello m header validator")
    let appUser = req.headers['isfreeappuser']
    if(appUser==undefined){
        res.send("sorry buddy no app user details")
    }else if(appUser=="true"){
        console.log(req.body)
    }
    next()

}





module.exports.headerValidate = headerValidate
