const { body, validationResult } = require("express-validator");
const { fetchPermissions } = require("../helpers");

const idFieldChecks = [body("id", "Invalid id").isInt({ min: 1 })];

const quizIdFieldChecks = [body("quiz_id", "Invalid id").isInt({ min: 1 })];

const questionBodyFieldsCheck = [
  body("question", "Question should have atleast three characters")
    .trim()
    .isLength({ min: 3, max: 100 }),
  body("option_a", "Option should have atleast three characters")
    .trim()
    .isLength({ min: 3, max: 100 }),
  body("option_b", "Option should have atleast three characters")
    .trim()
    .isLength({ min: 3, max: 100 }),
  body("option_c", "Option should have atleast three characters")
    .trim()
    .isLength({ min: 3, max: 100 }),
  body("option_d", "Option should have atleast three characters")
    .trim()
    .isLength({ min: 3, max: 100 }),
  body("answer", "Answer should have exact one character")
    .trim()
    .isLength({ min: 1, max: 1 }),
  body("marks").isInt({ min: 1 }),
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
  quizIdFieldChecks,
  questionBodyFieldsCheck,
  validateFields,
  checkCreatePermission,
  checkEditPermission,
  checkDeletePermission,
};
