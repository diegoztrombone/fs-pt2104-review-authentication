const { getUser } = require('../../queries/auth')
const { serialize, hash, cookies } = require('../../helpers')

module.exports = db => async (req, res, next) => {
    const { email, password } = req.body

    const user = await getUser(db, { email }, hash.compare(password))

    if (user === false) {
        cookies.clear(res)
        return next({ error: new Error('Something went wrong') })
    }
    
    serialize(res, { email: user.email, username: user.username})

    res.status(200).json({
        success: true,
        data: {
            email: user.email,
            username: user.username
        }
    })
}