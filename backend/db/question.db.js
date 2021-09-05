const db = require("./db.config");

const dbCreateQuestion = async (question) => {
  await db
    .promise()
    .execute(
      "INSERT INTO `questions` (`question`, `option_a`, `option_b`, `option_c`, `option_d`, `answer`, `marks`, `quiz_id`)\
       VALUES (?,?,?,?,?,?,?,?)",
      question
    )
    .catch((e) => {
      throw { errorMessage: e.sqlMessage, statusCode: 400 };
    });
  return { statusCode: 200 };
};

const dbFetchAllQuestions = async (quiz_id) => {
  const [rows] = await db
    .promise()
    .execute(
      "SELECT `question`, `option_a`, `option_b`, `option_c`, `option_d`, `marks` FROM `questions` WHERE `quiz_id` = ?",
      [quiz_id]
    )
    .catch((e) => {
      throw { errorMessage: e.sqlMessage, statusCode: 400 };
    });
  return { data: rows, statusCode: 200 };
};

const dbEditQuestion = async (question) => {
  await db
    .promise()
    .execute(
      "UPDATE `questions` \
      SET `question`=?, `option_a`=?, `option_b`=?, `option_c`=?, \
      `option_d`=?, `answer`=?, `marks`=? WHERE id = ?",
      question
    )
    .catch((e) => {
      throw { errorMessage: e.sqlMessage, statusCode: 400 };
    });
  return { statusCode: 200 };
};

const dbRemoveQuestion = async (id) => {
  await db
    .promise()
    .execute("DELETE FROM `questions` WHERE id = ?", [id])
    .catch((e) => {
      throw { errorMessage: e.sqlMessage, statusCode: 400 };
    });
  return { statusCode: 200 };
};

module.exports = {
  dbCreateQuestion,
  dbEditQuestion,
  dbFetchAllQuestions,
  dbRemoveQuestion,
};
