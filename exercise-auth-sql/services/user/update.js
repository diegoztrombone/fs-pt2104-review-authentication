const { cloudinary } = require('../../helpers')
const { updateProfile } = require('../../queries/user')
const { serialize } = require('../../helpers')

module.exports = db => async (req, res, next) => {
    const { mimetype, buffer } = req.file
    const { newUsername } = req.body
    const { email, username } = res.locals.user

    const user = await updateProfile(
        db,
        { email, username },
        { newUsername },
        cloudinary.upload(mimetype, buffer)
    )

    if (user === false) {
        return next({
            statusCode: 500,
            error: new Error('something went wrong')
        })
    }

    serialize(res, { email: user.email, username: user.username, active: user.active })

    res.status(200).json({
        success: true,
        data: {
            email: user.email,
            username: user.username,
            pic: user.profile_pic,
        }
    })
}