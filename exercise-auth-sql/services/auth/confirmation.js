const { confirmUser } = require('../../queries/auth')
module.exports = db => async (req, res, next) => {
    const { confirmationToken } = req.params
    console.log(confirmationToken)
    if (!confirmationToken) {
        return next({ error: new Error('Something went wrong') })
    }
    const update = await confirmUser(db, { confirmationToken })
    if (update === false) {
        return next({ error: new Error('Invalid token') })
    }
    res.status(200).json({
        success: true,
        data: "Account actived"
    })
}