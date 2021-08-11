const { jwt } = require('../helpers')

module.exports = (req, res, next) => {
    const { token } = req.cookies
    const user = jwt.fromJWT(token)

    if (user === false) {
        return next({
            statuscode: 401, 
            error: new Error('Unauthorized primo'),
        })
    }

    res.locals.user = user

    next()

}