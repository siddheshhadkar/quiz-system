const db = require("./db.config");

const dbFetchUserByEmail = async (email) => {
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
  const result = await db
    .promise()
    .execute(
      "INSERT INTO `users` (`name`, `email`, `password`, `role_id`, `category_id`) VALUES (?,?,?,?,?)",
      user
    )
    .catch((err) => {
      throw { errorMessage: err.sqlMessage, statusCode: 400 };
    });
  return { data: result[0].insertId, statusCode: 200 };
};

const dbUpdateUser = async (user) => {};
const dbRemoveUser = async (user) => {};

const dbFetchPermissions = async (userId) => {
  const [rows] = await db
    .promise()
    .execute(
      "SELECT permissions.name FROM role_has_permissions \
      INNER JOIN users ON role_has_permissions.role_id = users.role_id \
      INNER JOIN permissions ON role_has_permissions.permission_id = permissions.id WHERE users.id = ?",
      [userId]
    )
    .catch((e) => {
      throw { errorMessage: e.sqlMessage, statusCode: 400 };
    });
  return { data: rows, statusCode: 200 };
};

module.exports = {
  dbFetchUserByEmail,
  dbCreateUser,
  dbUpdateUser,
  dbRemoveUser,
  dbFetchPermissions,
};
