const db = require("./db.config");

const dbfetchUserByEmail = async (email) => {
  let errorMessage = null;
  const [rows, fields] = await db
    .promise()
    .execute("SELECT * FROM `users` WHERE `email`=? LIMIT 1", [email])
    .catch((err) => {
      errorMessage = err.sqlMessage;
    });

  const obj = {};
  if (errorMessage !== null) {
    obj["errorMessage"] = errorMessage;
    obj["statusCode"] = 400;
    return obj;
  }
  if (rows.length === 0) {
    obj["errorMessage"] = `No user with email: ${email} exists`;
    obj["statusCode"] = 404;
    return obj;
  }
  obj["data"] = rows[0];
  obj["statusCode"] = 200;
  return obj;
};

const dbCreateUser = async (user) => {
  let errorMessage = null;
  const result = await db
    .promise()
    .execute(
      "INSERT INTO `users` (`name`, `email`, `password`, `role_id`, `category_id`) VALUES (?,?,?,?,?)",
      user
    )
    .catch((err) => {
      errorMessage = err.sqlMessage;
    });

  const obj = {};
  if (errorMessage !== null) {
    obj["errorMessage"] = errorMessage;
    obj["statusCode"] = 400;
    return obj;
  }
  obj["data"] = result[0].insertId;
  obj["statusCode"] = 200;
  return obj;
};

const dbUpdateUser = async (user) => {};
const dbRemoveUser = async (user) => {};

module.exports = {
  dbfetchUserByEmail,
  dbCreateUser,
  dbUpdateUser,
  dbRemoveUser,
};
