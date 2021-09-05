const {
  createQuestion,
  editQuestion,
  fetchAllQuestions,
  removeQuestion,
} = require("../services/question.services");

const postQuestion = async (req, res) => {
  try {
    await createQuestion(req.body);
    return res.status(200).json({ success: true });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const result = await fetchAllQuestions(req.body.quiz_id);
    return res.status(200).json({ data: result.data, success: true });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
};

const putQuestion = async (req, res) => {
  try {
    await editQuestion(req.body);
    return res.status(200).json({ success: true });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    await removeQuestion(req.body.id);
    return res.status(200).json({ success: true });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
};

module.exports = {
  deleteQuestion,
  getAllQuestions,
  postQuestion,
  putQuestion,
};
