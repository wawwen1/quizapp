const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query('SELECT * FROM quizzes;')
    .then(result => {
      const quizzes = result.rows;
      const templateVars = { quizzes };
      res.render("quizzes", templateVars);
    })
    //const templateVars = {user: req.session["userID"]}
  });

  /* Get Request: quiz_selected for when user selects a quiz */
  router.get("/:id", (req, res) => {
    //const templateVars = {user: req.session["userID"]}
    db.query(`SELECT questions.id as question_id, questions.question as question_name, quizzes.name as quiz_name, quizzes.id as quiz_id, answers.answer, answers.id
    FROM questions
    LEFT JOIN answers
    ON questions.id  = answers.question_id
    JOIN quizzes
    ON questions.quiz_id = quizzes.id
    WHERE questions.quiz_id = $1;`, [req.params.id])
      .then(result => {
        const templateVars = {questions: result.rows}
        console.log("+++++++++++", templateVars)
        const data = result.rows;

        return res.render("quiz_selected", templateVars)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  return router;
};

/* SELECT questions.id as question_id, questions.question, quizzes.*, answers.answer
from questions
JOIN quizzes
ON questions.quiz_id = quizzes.id
JOIN answers
ON questions.id = answers.question_id WHERE quiz_id = $1;*/
