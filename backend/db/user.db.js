const db = require("./db.config");

const dbFetchUserByEmail = async (email) => {
  const [rows] = await db
    .promise()
    .execute(
      "SELECT `id`, `name`, `email`, `role_id`, `category_id` FROM `users` WHERE `email`=?",
      [email]
    )
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

const dbFetchUserWithPassword = async (email) => {
  const [rows] = await db
    .promise()
    .execute(
      "SELECT `id`, `name`, `email`, `password` FROM `users` WHERE `email`=?",
      [email]
    )
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
  const [result] = await db
    .promise()
    .execute("SELECT `email` FROM `users` WHERE `email` = ?", [user[1]])
    .catch((e) => {
      throw { errorMessage: e.sqlMessage, statusCode: 400 };
    });
  if (result.length === 0) {
    const result = await db
      .promise()
      .execute(
        "INSERT INTO `users` (`name`, `email`, `password`, `role_id`, `category_id`) VALUES (?,?,?,?,?)",
        user
      )
      .catch((e) => {
        throw { errorMessage: e.sqlMessage, statusCode: 400 };
      });
    return { data: result[0].insertId, statusCode: 200 };
  } else {
    throw {
      errorMessage: "This email is associated with a different account",
      statusCode: 400,
    };
  }
};

const dbUpdateUser = async (user) => {};

const dbRemoveUser = async (id) => {
  await db
    .promise()
    .execute("DELETE FROM `users` WHERE id = ?", [id])
    .catch((e) => {
      throw { errorMessage: e.sqlMessage, statusCode: 400 };
    });
  return { statusCode: 200 };
};

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
  dbFetchUserWithPassword,
  dbCreateUser,
  dbUpdateUser,
  dbRemoveUser,
  dbFetchPermissions,
};
