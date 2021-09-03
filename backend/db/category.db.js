const db = require("./db.config");

const dbCreateCategory = async (name) => {
  await db
    .promise()
    .execute("INSERT INTO `categories` (`name`) VALUES (?)", [name])
    .catch((e) => {
      throw { errorMessage: e.sqlMessage, statusCode: 400 };
    });
  return { statusCode: 200 };
};

const dbFetchAllCategories = async () => {
  const [rows] = await db
    .promise()
    .execute("SELECT * FROM categorie")
    .catch((e) => {
      throw { errorMessage: e.sqlMessage, statusCode: 400 };
    });
  return { data: rows, statusCode: 200 };
};

const dbEditCategory = async (id, name) => {
  await db
    .promise()
    .execute("UPDATE `categories` SET `name` = ? WHERE `id` = ?", [name, id])
    .catch((e) => {
      throw { errorMessage: e.sqlMessage, statusCode: 400 };
    });
  return { statusCode: 200 };
};

const dbDeleteCategory = async (id) => {
  await db
    .promise()
    .execute("DELETE FROM `categories` WHERE `id` = ?", [id])
    .catch((e) => {
      throw { errorMessage: e.sqlMessage, statusCode: 400 };
    });
  return { statusCode: 200 };
};

module.exports = {
  dbCreateCategory,
  dbFetchAllCategories,
  dbEditCategory,
  dbDeleteCategory,
};
