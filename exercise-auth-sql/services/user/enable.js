const { getEnabled } = require('../../queries/user')
module.exports = db => async (req, res, next) => {
    const { email } = res.locals.user
    const enabled = await getEnabled(db, { email })
    if (enabled === false) {
        return next({ error: new Error('Something went wrong') })
    }

    res.status(200).json({
        success: true,
        data: "This account has been enabled"
    })
}