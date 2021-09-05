const db = require("./db.config");

const dbCreateQuiz = async (quiz) => {
  await db
    .promise()
    .execute(
      "INSERT INTO `quiz` (`title`, `description`, `total_marks`, `category_id`, `start_time`, `end_time`, `time_limit`) VALUES (?,?,?,?,?,?,?)",
      quiz
    )
    .catch((e) => {
      throw { errorMessage: e.sqlMessage, statusCode: 400 };
    });
  return { statusCode: 200 };
};

const dbFetchAllQuiz = async (category_id) => {
  const [rows] = await db
    .promise()
    .execute("SELECT * FROM `quiz` WHERE `category_id` = ?", [category_id])
    .catch((e) => {
      throw { errorMessage: e.sqlMessage, statusCode: 400 };
    });
  return { data: rows, statusCode: 200 };
};

const dbFetchQuizById = async (id) => {
  const [rows] = await db
    .promise()
    .execute("SELECT * FROM `quiz` WHERE `id` = ?", [id])
    .catch((e) => {
      throw { errorMessage: e.sqlMessage, statusCode: 400 };
    });
  if (rows.length === 0) {
    throw { errorMessage: `Quiz with id ${id} doesn't exist`, statusCode: 400 };
  }
  return { data: rows[0], statusCode: 200 };
};

const dbEditQuiz = async (quiz) => {
  await db
    .promise()
    .execute(
      "UPDATE `quiz` \
      SET `title`=?, `description`=?, `total_marks`=?, `category_id`=?, \
      `start_time`=?, `end_time`=?, `time_limit`=? WHERE id = ?",
      quiz
    )
    .catch((e) => {
      throw { errorMessage: e.sqlMessage, statusCode: 400 };
    });
  return { statusCode: 200 };
};

const dbRemoveQuiz = async (id) => {
  await db
    .promise()
    .execute("DELETE FROM `quiz` WHERE id = ?", [id])
    .catch((e) => {
      throw { errorMessage: e.sqlMessage, statusCode: 400 };
    });
  return { statusCode: 200 };
};

module.exports = {
  dbCreateQuiz,
  dbEditQuiz,
  dbFetchAllQuiz,
  dbFetchQuizById,
  dbRemoveQuiz,
};
