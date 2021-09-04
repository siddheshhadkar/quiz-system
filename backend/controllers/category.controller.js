const jwt = require("jsonwebtoken");
const {
  createCategory,
  fetchAllCategories,
  editCategory,
  removeCategory,
  fetchCategoryMembers,
} = require("../services/category.services");

const getAllCategories = async (req, res) => {
  try {
    const result = await fetchAllCategories();
    return res.status(200).json({ data: result.data, success: true });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
};

const postCategory = async (req, res) => {
  const name = req.body.name;
  try {
    await createCategory(name);
    return res.status(200).json({ success: true });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
};

const putCategory = async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  try {
    await editCategory(id, name);
    return res.status(200).json({ success: true });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
};

const deleteCategory = async (req, res) => {
  const id = req.body.id;
  try {
    await removeCategory(id);
    return res.status(200).json({ success: true });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
};

const getCategoryMembers = async (req, res) => {
  try {
    const result = await fetchCategoryMembers(req.params.id);
    return res.status(200).json({ data: result.data, success: true });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
};

module.exports = {
  getAllCategories,
  postCategory,
  putCategory,
  deleteCategory,
  getCategoryMembers,
};
