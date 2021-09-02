const bcrypt = require("bcryptjs");

const getPasswordHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const checkPassword = async (password, passwordHash) => {
  return await bcrypt.compare(password, passwordHash);
};

module.exports = {
  getPasswordHash,
  checkPassword,
};
