const { dbCreateCategory } = require("../db/category.db");

const createCategory = async (name) => {
  try {
    return await dbCreateCategory(name);
  } catch (e) {
    throw e;
  }
};

module.exports = {
  createCategory,
};
