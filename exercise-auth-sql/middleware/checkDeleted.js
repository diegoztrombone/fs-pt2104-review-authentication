const { sql } = require('slonik')


module.exports = db => async (req, res, next) => {
    const { email } = res.locals.user

    const checkDeleted = await db.maybeOne(sql`
        SELECT deleted
        FROM users
        WHERE email LIKE ${email}
    
    `)

    if (checkDeleted.deleted) {
        return next({ error: new Error('Account has been disabled!! Must active to use it') })
    }
    return next()

}