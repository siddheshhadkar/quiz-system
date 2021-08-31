const { dbfetchUserByEmail, dbCreateUser } = require("../db/user.db");

const fetchUser = async (email) => {
  let result = await dbfetchUserByEmail(email);
  return result;
};

const createUser = async (user) => {
  let result = await dbCreateUser(Object.values(user));
  return result;
};

const updateUser = () => {};

const removeUser = () => {};

module.exports = {
  fetchUser,
  createUser,
  updateUser,
  removeUser,
};
