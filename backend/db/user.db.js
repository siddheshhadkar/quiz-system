const db = require("./db.config");

const dbfetchUserByEmail = async (email) => {
  const [rows] = await db
    .promise()
    .execute("SELECT * FROM `users` WHERE `email`=? LIMIT 1", [email])
    .catch(() => {
      throw { errorMessage: "Malformed query", statusCode: 400 };
    });
  if (rows.length === 0) {
    throw {
      errorMessage: `No user with email: ${email} exists`,
      statusCode: 404,
    };
  }
  return { data: rows[0], statusCode: 200 };
};

const dbCreateUser = async (user) => {
  user.pop();
  let errorMessage = null;
  const result = await db
    .promise()
    .execute(
      "INSERT INTO `users` (`name`, `email`, `password`, `role_id`, `category_id`) VALUES (?,?,?,?,?)",
      user
    )
    .catch((err) => {
      errorMessage = err.sqlMessage;
      throw { errorMessage: errorMessage, statusCode: 400 };
    });
  return { data: result[0].insertId, statusCode: 200 };
};

const dbUpdateUser = async (user) => {};
const dbRemoveUser = async (user) => {};

module.exports = {
  dbfetchUserByEmail,
  dbCreateUser,
  dbUpdateUser,
  dbRemoveUser,
};
