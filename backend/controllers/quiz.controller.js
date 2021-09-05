const {
  createQuiz,
  editQuiz,
  fetchAllQuiz,
  fetchQuizById,
  removeQuiz,
} = require("../services/quiz.services");

const postQuiz = async (req, res) => {
  try {
    await createQuiz(req.body);
    return res.status(200).json({ success: true });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
};

const getAllQuiz = async (req, res) => {
  try {
    const result = await fetchAllQuiz(req.body.category_id);
    return res.status(200).json({ data: result.data, success: true });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
};

const getQuizById = async (req, res) => {
  try {
    const result = await fetchQuizById(req.body.id);
    return res.status(200).json({ data: result.data, success: true });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
};

const putQuiz = async (req, res) => {
  try {
    await editQuiz(req.body);
    return res.status(200).json({ success: true });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
};

const deleteQuiz = async (req, res) => {
  try {
    await removeQuiz(req.body.id);
    return res.status(200).json({ success: true });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
};

module.exports = {
  deleteQuiz,
  getAllQuiz,
  getQuizById,
  postQuiz,
  putQuiz,
};
