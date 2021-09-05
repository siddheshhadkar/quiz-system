const router = require("express").Router();
const { validateToken } = require("../../helpers");
const {
  idFieldChecks,
  categoryIdFieldChecks,
  quizBodyFieldsCheck,
  validateFields,
  checkCreatePermission,
  checkEditPermission,
  checkDeletePermission,
} = require("../../middlewares/quiz.middleware");
const {
  deleteQuiz,
  getAllQuiz,
  getQuizById,
  postQuiz,
  putQuiz,
} = require("../../controllers/quiz.controller");

router.post(
  "/",
  quizBodyFieldsCheck,
  validateFields,
  validateToken,
  checkCreatePermission,
  postQuiz
);

router.put(
  "/",
  idFieldChecks,
  quizBodyFieldsCheck,
  validateFields,
  validateToken,
  checkEditPermission,
  putQuiz
);

router.delete(
  "/",
  idFieldChecks,
  validateFields,
  validateToken,
  checkDeletePermission,
  deleteQuiz
);

router.get(
  "/all",
  categoryIdFieldChecks,
  validateFields,
  validateToken,
  getAllQuiz
);

router.get("/", idFieldChecks, validateFields, validateToken, getQuizById);

module.exports = router;
