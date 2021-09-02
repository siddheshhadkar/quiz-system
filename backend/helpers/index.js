const bcrypt = require("bcryptjs");
const { dbFetchUserByEmail, dbFetchPermissions } = require("../db/user.db");

const getPasswordHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const checkPassword = async (password, passwordHash) => {
  return await bcrypt.compare(password, passwordHash);
};

const fetchPermissions = async (email) => {
  try {
    const resultUser = await dbFetchUserByEmail(email);
    const user = resultUser.data;
    const resultPermissions = await dbFetchPermissions(user.id);
    const permissions = resultPermissions.data.map((item) => item.name);
    return permissions;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  getPasswordHash,
  checkPassword,
  fetchPermissions,
};
