const { sql } = require('slonik')

const profile = async (db, { email, username }) => {
  try {
    return await db.maybeOne(sql`
      SELECT
        id, email, username, active,
        profile_pic, created_at, updated_at
      FROM users
      WHERE
        email LIKE ${email} AND
        username LIKE ${username} AND
        active = true;
    `)
  } catch (error) {
    console.info('> error at "profile" query: ', error.message)
    return false
  }
}

const commonUpdate = async (
  db,
  { email, username },
  subquery
) => {
  return await db.query(sql`
    UPDATE users
    SET
      ${subquery},
      updated_at = now()
    WHERE
      email LIKE ${email} AND
      username LIKe ${username};
  `)
}

const update = async (
  db,
  { email, username },
  { newUsername },
  uploadFn
) => {
  try {
    return await db.transaction(async tx => {
      const user = await profile(tx, { email, username })

      if (!user) {
        throw new Error('user does not exist')
      }

      await commonUpdate(
        tx,
        { email, username },
        sql`username = ${newUsername || username}`
      )

      const uploadResult = await uploadFn(user.id)

      await commonUpdate(
        tx,
        { email, username: newUsername || username },
        sql`profile_pic = ${uploadResult.url || null}`
      )

      return await profile(tx, { email, username: newUsername || username })
    })
  } catch (error) {
    console.info('> error at "update" query: ', error.message)
    return false
  }
}

module.exports = {
  update,
  profile,
}