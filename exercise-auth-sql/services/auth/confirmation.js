const { confirmUser, confirmProfile } = require('../../queries/auth')

const { mailer } = require('../../helpers')

module.exports = db => async (req, res, next) => {
    const { confirmationToken } = req.params
    if (!confirmationToken) {
        return next({ error: new Error('Something went wrong') })
    }
    const result = await confirmProfile(db, {confirmationToken})
    const update = await confirmUser(db, { confirmationToken })
    
    if (update === false) {
        return next({ error: new Error('Invalid token') })
    }

    console.log(result)
    
    const mail = await mailer.loginMail({to: result.email, user: result.username})
    res.status(200).json({
        success: true,
        data: "Account actived"
    })
}