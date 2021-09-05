const router = require("express").Router();
const { validateToken } = require("../../helpers");
const {
  idFieldChecks,
  quizIdFieldChecks,
  questionBodyFieldsCheck,
  validateFields,
  checkCreatePermission,
  checkEditPermission,
  checkDeletePermission,
} = require("../../middlewares/question.middleware");
const {
  deleteQuestion,
  getAllQuestions,
  postQuestion,
  putQuestion,
} = require("../../controllers/question.controller");

router.post(
  "/",
  questionBodyFieldsCheck,
  quizIdFieldChecks,
  validateFields,
  validateToken,
  checkCreatePermission,
  postQuestion
);

router.put(
  "/",
  idFieldChecks,
  questionBodyFieldsCheck,
  validateFields,
  validateToken,
  checkEditPermission,
  putQuestion
);

router.delete(
  "/",
  idFieldChecks,
  validateFields,
  validateToken,
  checkDeletePermission,
  deleteQuestion
);

router.get(
  "/all",
  quizIdFieldChecks,
  validateFields,
  validateToken,
  getAllQuestions
);

module.exports = router;
