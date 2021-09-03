const {
  dbCreateCategory,
  dbFetchAllCategories,
  dbEditCategory,
  dbDeleteCategory,
} = require("../db/category.db");

const createCategory = async (name) => {
  try {
    return await dbCreateCategory(name);
  } catch (e) {
    throw e;
  }
};

const fetchAllCategories = async () => {
  try {
    return await dbFetchAllCategories();
  } catch (e) {
    throw e;
  }
};

const editCategory = async (id, name) => {
  try {
    return await dbEditCategory(id, name);
  } catch (e) {
    throw e;
  }
};

const removeCategory = async (name) => {
  try {
    return await dbDeleteCategory(name);
  } catch (e) {
    throw e;
  }
};

module.exports = {
  createCategory,
  fetchAllCategories,
  editCategory,
  removeCategory,
};
