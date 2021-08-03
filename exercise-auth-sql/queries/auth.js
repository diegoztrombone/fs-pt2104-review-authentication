const { sql } = require('slonik')

const createUser = async (db, { username, email, hash, birthdate, bio }) => {
    try {
      return await db.query(sql`
        INSERT INTO users (
          email, username, hash, birthdate, bio, active
        ) VALUES (
          ${email}, ${username}, ${hash}, ${birthdate}, ${bio}, true
        );
      `)
    } catch (error) {
      console.info('> error at "createUser" query: ', error.message)
      return false
    }
  }
module.exports = {
    createUser,
}