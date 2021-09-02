const router = require("express").Router();
const {
  getCategory,
  postCategory,
  putCategory,
  deleteCategory,
} = require("../../controllers/category.controller");
const {
  createCategoryFieldChecks,
  validateFields,
} = require("../../middlewares/category.middleware");

router.get("/", getCategory);
router.post("/", createCategoryFieldChecks, validateFields, postCategory);
router.put("/", putCategory);
router.delete("/", deleteCategory);

module.exports = router;
