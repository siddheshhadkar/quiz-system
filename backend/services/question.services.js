const {
  dbCreateQuestion,
  dbEditQuestion,
  dbFetchAllQuestions,
  dbRemoveQuestion,
} = require("../db/question.db");

const createQuestion = async (question) => {
  try {
    return await dbCreateQuestion(Object.values(question));
  } catch (e) {
    throw e;
  }
};

const editQuestion = async (question) => {
  const { id, ...newQuestion } = question;
  const questionArr = Object.values(newQuestion);
  questionArr.push(id);
  try {
    return await dbEditQuestion(questionArr);
  } catch (e) {
    throw e;
  }
};

const fetchAllQuestions = async (quiz_id) => {
  try {
    return await dbFetchAllQuestions(quiz_id);
  } catch (e) {
    throw e;
  }
};

const removeQuestion = async (id) => {
  try {
    return await dbRemoveQuestion(id);
  } catch (e) {
    throw e;
  }
};

module.exports = {
  createQuestion,
  editQuestion,
  fetchAllQuestions,
  removeQuestion,
};
