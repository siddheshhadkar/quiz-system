const jwt = require("jsonwebtoken");
const {
  fetchUser,
  fetchUserWithPassword,
  createUser,
  removeUser,
} = require("../services/user.services");
const { checkPassword } = require("../helpers");

const loginUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let result;
  try {
    result = await fetchUserWithPassword(email);
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
  const user = result.data;
  const passwordHash = result.data.password;
  if (await checkPassword(password, passwordHash)) {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 300 },
      (err, token) => {
        if (!err) {
          return res.status(200).json({ data: token, success: true });
        }
      }
    );
  } else {
    return res
      .status(401)
      .json({ errorMessage: "Wrong password", success: false });
  }
};

const getUser = async (req, res) => {
  try {
    const result = await fetchUser(req.user.email);
    return res
      .status(result.statusCode)
      .json({ data: result.data, success: true });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
};

const postUser = async (req, res) => {
  const user = req.body;
  try {
    const result = await createUser(user);
    return res
      .status(result.statusCode)
      .json({ data: result.data, success: true });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
};

const putUser = async (req, res) => {};

const deleteUser = async (req, res) => {
  try {
    const result = await removeUser(req.user.id);
    return res.status(result.statusCode).json({ success: true });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
};

module.exports = {
  loginUser,
  postUser,
  getUser,
  putUser,
  deleteUser,
};
