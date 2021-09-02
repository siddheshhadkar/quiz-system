const db = require("./db.config");

const dbCreateCategory = async (name) => {
  name = null;
  await db
    .promise()
    .execute("INSERT INTO `categories` (`name`) VALUES (?)", [name])
    .catch((e) => {
      console.log(e);
      throw { errorMessage: e.sqlMessage, statusCode: 400 };
    });
  return { statusCode: 200 };
};

module.exports = {
  dbCreateCategory,
};
