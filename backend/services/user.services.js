const { dbfetchUserByEmail, dbCreateUser } = require("../db/user.db");
const { getPasswordHash } = require("../helpers");

const fetchUser = async (email) => {
  try {
    const result = await dbfetchUserByEmail(email);
    return result;
  } catch (e) {
    throw e;
  }
};

const createUser = async (user) => {
  user.password = await getPasswordHash(user.password);
  try {
    let result = await dbCreateUser(Object.values(user));
    return result;
  } catch (e) {
    throw e;
  }
};

const updateUser = () => {};

const removeUser = () => {};

module.exports = {
  fetchUser,
  createUser,
  updateUser,
  removeUser,
};
