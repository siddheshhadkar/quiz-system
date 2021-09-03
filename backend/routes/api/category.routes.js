const router = require("express").Router();
const {
  getAllCategories,
  postCategory,
  putCategory,
  deleteCategory,
} = require("../../controllers/category.controller");
const {
  createCategoryFieldChecks,
  editCategoryFieldChecks,
  deleteCategoryFieldChecks,
  validateFields,
  validateToken,
  checkCreatePermission,
  checkViewPermission,
  checkEditPermission,
  checkDeletePermission,
} = require("../../middlewares/category.middleware");

router.get("/all", validateToken, checkViewPermission, getAllCategories);

router.post(
  "/",
  createCategoryFieldChecks,
  validateFields,
  validateToken,
  checkCreatePermission,
  postCategory
);

router.put(
  "/",
  editCategoryFieldChecks,
  validateFields,
  validateToken,
  checkEditPermission,
  putCategory
);

router.delete(
  "/",
  deleteCategoryFieldChecks,
  validateFields,
  validateToken,
  checkDeletePermission,
  deleteCategory
);

module.exports = router;
