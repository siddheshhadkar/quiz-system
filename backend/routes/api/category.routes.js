const router = require("express").Router();
const {
  getAllCategories,
  postCategory,
  putCategory,
  deleteCategory,
  getCategoryMembers,
} = require("../../controllers/category.controller");
const {
  createCategoryFieldChecks,
  editCategoryFieldChecks,
  categoryIdFieldCheck,
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
  categoryIdFieldCheck,
  validateFields,
  validateToken,
  checkDeletePermission,
  deleteCategory
);

router.get(
  "/:id",
  categoryIdFieldCheck,
  validateFields,
  validateToken,
  checkViewPermission,
  getCategoryMembers
);

module.exports = router;
