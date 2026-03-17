const jwt = require("jsonwebtoken")
const secretcode = "Harman@786"

module.exports = (req, res, next) => {

    var token = req.headers['authorization']
    jwt.verify(token, secretcode, function (err, result) {
        // console.log(err)
        // console.log(result)
        
        if (err == null) {
            req['decoded'] = result
            next()
        }
        else {
            res.json({
                status: 403,
                success: false,
                message: "Unauthenticated user"
            })
        }
    })
}