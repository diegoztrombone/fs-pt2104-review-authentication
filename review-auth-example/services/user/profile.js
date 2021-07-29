const { profile } = require('../../queries/user')

module.exports = db => async (req, res, next) => {
  const { email, username } = res.locals.user

  const user = await profile(db, { email, username })

  if (user === false) {
    return next({ error: new Error('something went wrong') })
  }

  res.status(200).json({
    success: true,
    data: {
      email: user.email,
      username: user.username,
      pic: user.profile_pic,
    }
  })
}