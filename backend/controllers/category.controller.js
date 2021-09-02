const jwt = require("jsonwebtoken");
const { createCategory } = require("../services/category.services");

const getCategory = async (req, res) => {};

const postCategory = async (req, res) => {
  const name = req.body.name;
  let result;
  try {
    result = await createCategory(name);
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
  return res.status(200).json({ success: true });
};

const putCategory = async (req, res) => {};
const deleteCategory = async (req, res) => {};

module.exports = {
  getCategory,
  postCategory,
  putCategory,
  deleteCategory,
};
