const express = require("express");
const router = express.Router();
const {
  getUser,
  postUser,
  putUser,
  deleteUser,
} = require("../../controllers/user.controller");

router.get("/", getUser);
router.post("/", postUser);
router.put("/", putUser);
router.delete("/", deleteUser);

module.exports = router;
