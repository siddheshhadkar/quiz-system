const jwt = require("jsonwebtoken");
const {
  createCategory,
  fetchAllCategories,
  editCategory,
  removeCategory,
} = require("../services/category.services");

const getAllCategories = async (req, res) => {
  let result;
  try {
    result = await fetchAllCategories();
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
  return res.status(200).json({ data: result.data, success: true });
};

const postCategory = async (req, res) => {
  const name = req.body.name;
  try {
    await createCategory(name);
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
  return res.status(200).json({ success: true });
};

const putCategory = async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  try {
    await editCategory(id, name);
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
  return res.status(200).json({ success: true });
};
const deleteCategory = async (req, res) => {
  const id = req.body.id;
  try {
    await removeCategory(id);
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
  return res.status(200).json({ success: true });
};

module.exports = {
  getAllCategories,
  postCategory,
  putCategory,
  deleteCategory,
};
