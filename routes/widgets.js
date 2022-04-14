/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM quizzes`;
    console.log(query);
    db.query(query)
      .then(data => {
        const widgets = data.rows;
        res.json({ widgets });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //CREATE QUIZ -- GET
  router.get("/quizzes/new", (req, res) => {
    res.render("quiz_create");
  });

  //CREATE QUIZ -- POST
  router.post("/quizzes/new", (req, res) => {
    let { private } = req.body;
    const { name, description } = req.body;
    const q1 = { question: req.body.q1, input: req.body.input1, answer: req.body.answer1 };
    const q2 = { question: req.body.q2, input: req.body.input2, answer: req.body.answer2 };
    const q3 = { question: req.body.q3, input: req.body.input3, answer: req.body.answer3 };

    const newQuiz = { q1, q2, q3 };

    if (private === undefined) {
      private = false;
    }

    if (!name || !description || !q1.question || !q2.question || !q3.question) {
      return res.send("Please fill out the quiz completely! Go back");
    }

    db.query(`
    INSERT INTO quizzes (owner_id, name, description, private)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `, [req.params.id, name, description, private])
      .then(res => {
        let quizID = res.rows[0].id;    //take quiz.id to input into questions

//LOOP THROUGH NEWQUIZ OBJECT TO ADD INDIVIDUAL QUESTIONS TO TABLE
        for (let question of Object.keys(newQuiz)) {
          db.query(`
        INSERT INTO questions (quiz_id, question)
        VALUES ($1, $2)
        RETURNING *;
        `, [quizID, newQuiz[question].question])
            .then(res => {
              console.log(res.rows[0]);
              let questionID = res.rows[0].id;    //take question.id input into answers

//WHEN RADIO VALUE EQUALS ANSWER VALUE -> RESULT = TRUE

               // console.log(newQuiz[question].input);
              for (let input of newQuiz[question].input) {

                let correct = (newQuiz[question].answer ? true : false);  //true to match boolean input
                db.query(`
                INSERT INTO answers (question_id, answer, correct)
                VALUES ($1, $2, $3)
                RETURNING *;
                `, [questionID, input, correct])
                .then(res => {
                  console.log(res.rows[0]);
                })
                .catch(err => {
                  res
                  .status(500)
                  .json({ error: err.message });
                });
              }
            });
        }
      });
      return res.redirect("/quizzes");
  });


  return router;
};
