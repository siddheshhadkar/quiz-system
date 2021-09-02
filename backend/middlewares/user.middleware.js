const { body, validationResult } = require("express-validator");

const createUserFieldChecks = [
  body("name", "Name should have atleast three characters").trim().isLength({
    min: 3,
  }),
  body("email", "Enter a valid email address")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "Password needs to have minimum 8 chars").isLength({
    min: 8,
    max: 72,
  }),
  body("role_id").isInt({ min: 2, max: 3 }),
  body("category_id").notEmpty(),
];

const getUserFieldChecks = [
  body("email", "Enter a valid email address")
    .trim()
    .isEmail()
    .normalizeEmail(),
];

const loginFieldChecks = [
  body("email", "Enter a valid email address")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "Password needs to have minimum 8 chars").isLength({
    min: 8,
    max: 72,
  }),
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

module.exports = {
  createUserFieldChecks,
  getUserFieldChecks,
  loginFieldChecks,
  validateFields,
};
