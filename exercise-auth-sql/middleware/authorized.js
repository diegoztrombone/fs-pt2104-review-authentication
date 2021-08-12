const { deserialize } = require('../helpers')

module.exports = (req, res, next) => {
    const user = deserialize(req)
    if (user === false) {
        return next({
            statuscode: 401, 
            error: new Error('Unauthorized'),
        })
    }

    res.locals.user = user

    next()

}