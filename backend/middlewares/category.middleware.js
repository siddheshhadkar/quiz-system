const { body, validationResult, check } = require("express-validator");
const { fetchPermissions } = require("../helpers");

const createCategoryFieldChecks = [
  body("name", "Name should have atleast three characters").trim().isLength({
    min: 3,
    max: 30,
  }),
];

const editCategoryFieldChecks = [
  body("id", "Invalid id").isInt({ min: 1 }),
  body("name", "Name should have atleast three characters").trim().isLength({
    min: 3,
    max: 30,
  }),
];

const categoryIdFieldCheck = [check("id", "Invalid id").isInt({ min: 1 })];

const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      success: false,
    });
  }
  next();
};

const checkCreatePermission = async (req, res, next) => {
  try {
    const permissions = await fetchPermissions(req.user.id);
    if (permissions.includes("CREATE_CATEGORY")) {
      return next();
    } else {
      return res.status(401).json({
        errorMessage: "User not authorized to make this request",
        success: false,
      });
    }
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
};

const checkViewPermission = async (req, res, next) => {
  try {
    const permissions = await fetchPermissions(req.user.id);
    if (permissions.includes("VIEW_CATEGORIES")) {
      return next();
    } else {
      return res.status(401).json({
        errorMessage: "User not authorized to make this request",
        success: false,
      });
    }
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
};

const checkEditPermission = async (req, res, next) => {
  try {
    const permissions = await fetchPermissions(req.user.id);
    if (permissions.includes("EDIT_CATEGORY")) {
      return next();
    } else {
      return res.status(401).json({
        errorMessage: "User not authorized to make this request",
        success: false,
      });
    }
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
};

const checkDeletePermission = async (req, res, next) => {
  try {
    const permissions = await fetchPermissions(req.user.id);
    if (permissions.includes("DELETE_CATEGORY")) {
      return next();
    } else {
      return res.status(401).json({
        errorMessage: "User not authorized to make this request",
        success: false,
      });
    }
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
};

module.exports = {
  createCategoryFieldChecks,
  editCategoryFieldChecks,
  categoryIdFieldCheck,
  validateFields,
  checkCreatePermission,
  checkViewPermission,
  checkEditPermission,
  checkDeletePermission,
};
