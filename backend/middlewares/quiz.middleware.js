const { body, validationResult } = require("express-validator");
const { fetchPermissions } = require("../helpers");

const idFieldChecks = [body("id", "Invalid id").isInt({ min: 1 })];

const categoryIdFieldChecks = [
  body("category_id", "Invalid id").isInt({ min: 1 }),
];

const quizBodyFieldsCheck = [
  body("title", "Title should have atleast three characters")
    .trim()
    .isLength({ min: 3, max: 50 }),
  body("description", "Description should have atleast three characters")
    .trim()
    .isLength({ min: 3, max: 200 }),
  body("total_marks").isInt({ min: 0 }),
  body("category_id").isInt({ min: 0 }),
  body("start_time").trim().isISO8601(),
  body("end_time").trim().isISO8601(),
  body("time_limit").isInt({ min: 0 }),
];

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
    if (permissions.includes("CREATE_QUIZ")) {
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
    if (permissions.includes("EDIT_QUIZ")) {
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
    if (permissions.includes("DELETE_QUIZ")) {
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
  idFieldChecks,
  categoryIdFieldChecks,
  quizBodyFieldsCheck,
  validateFields,
  checkCreatePermission,
  checkEditPermission,
  checkDeletePermission,
};
