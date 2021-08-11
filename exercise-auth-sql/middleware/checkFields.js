module.exports = fields => async (req, res, next) => {
    for (field of fields) {
        if (!req.body[field]) {
            return next({ error: new Error('All fields are mandatory!') })
        }
    }
    return next()
}