const jwt = require("jsonwebtoken");
const {
  fetchUser,
  createUser,
  removeUser,
  updateUser,
} = require("../services/user.services");
const { checkPassword } = require("../helpers");

const loginUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let result;
  try {
    result = await fetchUser(email);
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
  const user = result.data;

  if (result.statusCode === 200) {
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
        { expiresIn: 30 },
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
  } else {
    return res
      .status(result.statusCode)
      .json({ errorMessage: result.errorMessage, success: false });
  }
};

const getUser = async (req, res) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).json({ error: "Token not found, request denied" });
  }
  const [, token] = authToken.split(" ");
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token, request denied" });
    } else {
      const email = decoded.email;
      const result = await fetchUser(email);
      if (result.statusCode === 200) {
        res
          .status(result.statusCode)
          .json({ data: result.data, success: true });
      } else {
        res
          .status(result.statusCode)
          .json({ errorMessage: result.errorMessage, success: false });
      }
    }
  });
};

const postUser = async (req, res) => {
  const user = req.body;
  let result;
  try {
    result = await createUser(user);
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
  if (result.statusCode === 200) {
    return res
      .status(result.statusCode)
      .json({ data: result.data, success: true });
  } else {
    return res
      .status(result.statusCode)
      .json({ errorMessage: result.errorMessage, success: false });
  }
};

const putUser = async (req, res) => {};
const deleteUser = async (req, res) => {};

module.exports = {
  loginUser,
  postUser,
  getUser,
  putUser,
  deleteUser,
};
