module.exports = db => async (req, res, next) => {
  const { email, username } = res.locals.user

  res.status(200).json({
    success: true,
    data: {
      email,
      username,
    }
  })
}