const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { dbFetchPermissions } = require("../db/user.db");

const getPasswordHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const checkPassword = async (password, passwordHash) => {
  return await bcrypt.compare(password, passwordHash);
};

const validateToken = (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).json({ error: "Token not found, request denied" });
  }
  const [, token] = authToken.split(" ");
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (!err) {
      req["user"] = {};
      req.user.id = decoded.id;
      req.user.email = decoded.email;
      return next();
    }
    return res.status(401).json({ error: "Invalid token, request denied" });
  });
};

const fetchPermissions = async (id) => {
  try {
    const resultPermissions = await dbFetchPermissions(id);
    const permissions = resultPermissions.data.map((item) => item.name);
    return permissions;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  getPasswordHash,
  checkPassword,
  validateToken,
  fetchPermissions,
};
