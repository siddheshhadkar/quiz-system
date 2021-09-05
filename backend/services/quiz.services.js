const {
  dbCreateQuiz,
  dbEditQuiz,
  dbFetchAllQuiz,
  dbFetchQuizById,
  dbRemoveQuiz,
} = require("../db/quiz.db");

const createQuiz = async (quiz) => {
  try {
    return await dbCreateQuiz(Object.values(quiz));
  } catch (e) {
    throw e;
  }
};

const editQuiz = async (quiz) => {
  const { id, ...newQuiz } = quiz;
  const quizArr = Object.values(newQuiz);
  quizArr.push(id);
  try {
    return await dbEditQuiz(quizArr);
  } catch (e) {
    throw e;
  }
};

const fetchAllQuiz = async (category_id) => {
  try {
    return await dbFetchAllQuiz(category_id);
  } catch (e) {
    throw e;
  }
};

const fetchQuizById = async (id) => {
  try {
    return await dbFetchQuizById(id);
  } catch (e) {
    throw e;
  }
};

const removeQuiz = async (id) => {
  try {
    return await dbRemoveQuiz(id);
  } catch (e) {
    throw e;
  }
};

module.exports = {
  createQuiz,
  editQuiz,
  fetchAllQuiz,
  fetchQuizById,
  removeQuiz,
};
