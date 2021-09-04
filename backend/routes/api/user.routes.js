const router = require("express").Router();
const {
  loginUser,
  getUser,
  postUser,
  putUser,
  deleteUser,
} = require("../../controllers/user.controller");
const {
  createUserFieldChecks,
  getUserFieldChecks,
  loginFieldChecks,
  validateFields,
} = require("../../middlewares/user.middleware");
const { validateToken } = require("../../helpers");

router.get("/login", loginFieldChecks, validateFields, loginUser);
router.get("/", validateToken, getUser);
router.post("/", createUserFieldChecks, validateFields, postUser);
router.put("/", createUserFieldChecks, validateFields, validateToken, putUser);
router.delete("/", validateToken, deleteUser);

module.exports = router;
