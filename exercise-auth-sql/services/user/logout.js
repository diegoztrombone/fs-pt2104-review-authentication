const { cookies } = require('../../helpers')

module.exports = db => async (req, res, next) => {
    const { username } = res.locals.user
    cookies.clear(res)
    res.status(200).json({
        success: true,
        data: `Logout successfully, ${username}`
    })

}