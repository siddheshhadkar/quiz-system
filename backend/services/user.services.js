const {
  dbFetchUserByEmail,
  dbCreateUser,
  dbRemoveUser,
  dbFetchUserWithPassword,
} = require("../db/user.db");
const { getPasswordHash } = require("../helpers");

const fetchUser = async (email) => {
  try {
    return await dbFetchUserByEmail(email);
  } catch (e) {
    throw e;
  }
};

const fetchUserWithPassword = async (email) => {
  try {
    return await dbFetchUserWithPassword(email);
  } catch (e) {
    throw e;
  }
};

const createUser = async (user) => {
  user.password = await getPasswordHash(user.password);
  try {
    return await dbCreateUser(Object.values(user));
  } catch (e) {
    throw e;
  }
};

const updateUser = () => {};

const removeUser = async (id) => {
  try {
    return await dbRemoveUser(id);
  } catch (e) {
    throw e;
  }
};

module.exports = {
  fetchUser,
  fetchUserWithPassword,
  createUser,
  updateUser,
  removeUser,
};
