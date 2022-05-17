const jwt = require('jsonwebtoken')

const tokenValidator = async function (req, res, next) {
    try {
        let token = req.headers["x-Api-key"]
        if (!token) token = req.headers["x-api-key"]

        if (!token) return res.status(403).send({ status: false, msg: "Missing authentication token in request" })

        let decodedToken = jwt.verify(token, "project-3/group-37")
        if (!decodedToken) {
            return res.status(403).send({ status: false, msg: "Invalid authentication token in request" })
        }
        console.log(decodedToken)
        req.userId = decodedToken.userId;
        
        next()
    }
    catch (error) {
        res.status(500).send(error.message)
    }
}


module.exports = { tokenValidator }