const {
  fetchUser,
  createUser,
  removeUser,
  updateUser,
} = require("../services/user.services");

const getUser = async (req, res) => {
  const email = req.body.email;
  const result = await fetchUser(email);
  if (result.statusCode === 200) {
    res.status(result.statusCode).json({ data: result.data, success: true });
  } else {
    res
      .status(result.statusCode)
      .json({ errorMessage: result.errorMessage, success: false });
  }
};

const postUser = async (req, res) => {
  const user = req.body;
  const result = await createUser(user);
  if (result.statusCode === 200) {
    res.status(result.statusCode).json({ data: result.data, success: true });
  } else {
    res
      .status(result.statusCode)
      .json({ errorMessage: result.errorMessage, success: false });
  }
};

const putUser = async (req, res) => {};
const deleteUser = async (req, res) => {};

module.exports = {
  postUser,
  getUser,
  putUser,
  deleteUser,
};
