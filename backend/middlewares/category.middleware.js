const { body, validationResult } = require("express-validator");

const createCategoryFieldChecks = [
  body("name", "Name should have atleast three characters").trim().isLength({
    min: 3,
    max: 30,
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
  createCategoryFieldChecks,
  validateFields,
};
