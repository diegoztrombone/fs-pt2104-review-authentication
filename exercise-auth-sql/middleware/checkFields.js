const { cookies } = require('../helpers')
module.exports = fields => async (req, res, next) => {
    for (field of fields) {
        if (!req.body[field]) {
            cookies.clear(res)
            return next({ error: new Error('All fields are mandatory!') })
        }
    }
    return next()
}