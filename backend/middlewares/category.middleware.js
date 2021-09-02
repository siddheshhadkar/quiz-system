const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { fetchPermissions } = require("../helpers");

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

const validateToken = (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).json({ error: "Token not found, request denied" });
  }
  const [, token] = authToken.split(" ");
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (!err) {
      req.body.email = decoded.email;
      return next();
    }
    return res.status(401).json({ error: "Invalid token, request denied" });
  });
};

const checkPostPermission = async (req, res, next) => {
  try {
    const permissions = await fetchPermissions(req.body.email);
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

module.exports = {
  createCategoryFieldChecks,
  validateFields,
  validateToken,
  checkPostPermission,
};
