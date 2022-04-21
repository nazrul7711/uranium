const req = require("express/lib/request")
const UserModel= require("../models/userModel")




// const createAUser = function(req, res) {
//     let requestBody = req.body
//     let headers  = req.headers
    

    //Printing all the headers before modification - addition of a new header called 'month'
    // console.log('Request headers are before: ', headers)

    //Accessing a request header called 'batch'
    // let batchHeader = headers["batch"] // headers.batch 
    
    ///Accessing a request header called 'content-type'
    // let contentHeader = headers['content-type'] // headers.content-type

    // console.log('Content Type hedser is: ',contentHeader)
    // console.log('Batch header is: ', batchHeader)

    //Adding a new requets header
    // req.headers["month"] = 'April' //req.headers.month = 'April' or req.headers["month"] = 'April'


    //Printing the headers after modification - addition of a new header called 'month'
    // console.log('Request headers are after: ', headers)


    // console.log('Request property called current-day', req['current-day'])
    
    //Adding a response header
    // res.header('year', '2022')
    // console.log(res)

    // res.send('Just create a user')
// }

// module.exports.createAUser = createAUser


















const createUser= async function (req, res) {
    let data= req.body
    let savedData= await UserModel.create(data)
    res.send({msg: savedData})
}



module.exports.createUser= createUser
