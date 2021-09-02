const express = require("express");
const router = express.Router();
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

router.get("/login", loginFieldChecks, validateFields, loginUser);
router.get("/", getUserFieldChecks, validateFields, getUser);
router.post("/", createUserFieldChecks, validateFields, postUser);
router.put("/", putUser);
router.delete("/", deleteUser);

module.exports = router;
