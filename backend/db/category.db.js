const db = require("./db.config");

const dbCheckIfCategoryExists = async (name) => {
  const [result] = await db
    .promise()
    .execute("SELECT `name` FROM `categories` WHERE `name` = ?", [name])
    .catch((e) => {
      throw { errorMessage: e.sqlMessage, statusCode: 400 };
    });
  if (result.length === 0) {
    return true;
  } else {
    return false;
  }
};

const dbCreateCategory = async (name) => {
  if (await dbCheckIfCategoryExists(name)) {
    await db
      .promise()
      .execute("INSERT INTO `categories` (`name`) VALUES (?)", [name])
      .catch((e) => {
        throw { errorMessage: e.sqlMessage, statusCode: 400 };
      });
    return { statusCode: 200 };
  } else {
    throw {
      errorMessage: "Category with this name already exists",
      statusCode: 400,
    };
  }
};

const dbFetchAllCategories = async () => {
  const [rows] = await db
    .promise()
    .execute("SELECT * FROM `categories`")
    .catch((e) => {
      throw { errorMessage: e.sqlMessage, statusCode: 400 };
    });
  return { data: rows, statusCode: 200 };
};

const dbEditCategory = async (id, name) => {
  if (await dbCheckIfCategoryExists(name)) {
    await db
      .promise()
      .execute("UPDATE `categories` SET `name` = ? WHERE `id` = ?", [name, id])
      .catch((e) => {
        throw { errorMessage: e.sqlMessage, statusCode: 400 };
      });
    return { statusCode: 200 };
  } else {
    throw {
      errorMessage: "Category with this name already exists",
      statusCode: 400,
    };
  }
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

const dbFetchCategoryMembers = async (id) => {
  const [rows] = await db
    .promise()
    .execute(
      "SELECT `id`, `name`, `email`, `role_id` FROM `users` WHERE `category_id` = ?",
      [id]
    )
    .catch((e) => {
      throw { errorMessage: e.sqlMessage, statusCode: 400 };
    });
  return { data: rows, statusCode: 200 };
};

module.exports = {
  dbCreateCategory,
  dbFetchAllCategories,
  dbEditCategory,
  dbDeleteCategory,
  dbFetchCategoryMembers,
};
