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
  router.post("/quizzes/new", (req, res) => {2
    let { private } = req.body
    const { name, description } = req.body;
    const q1 = { question: req.body.q1, input: req.body.input1, answer: req.body.answer1 };
    const q2 = { question: req.body.q2, input: req.body.input2, answer: req.body.answer2 };
    const q3 = { question: req.body.q3, input: req.body.input3, answer: req.body.answer3 };

    const newQuiz = { q1, q2, q3 };

    if (private === undefined) {
      private = false;
    }

    db.query(`
    INSERT INTO quizzes (name, description, private, created)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `, [name, description, private, '2022-04-13'])
    .then(res => {
      //console.log(res.rows[0]);
      let quizID = res.rows[0].id;

      //loop through each set of questions to apply individual q&a
      for (let q in newQuiz) {
        db.query(`
        INSERT INTO questions (quiz_id, question)
        VALUES ($1, $2)
        RETURNING *;
        `, [quizID, newQuiz[q].question])
        .then(res => {
          //console.log('QUESTIONS', res.rows[0])
          let questionID = res.rows[0].id;

          //when correct value = radio html value pass true to indicate correct answer
          //when radio value != 1 (first option) how to make it = true

            db.query(`
            INSERT INTO answers (question_id, answer, correct)
            VALUES ($1, $2, $3)
            RETURNING *;
            `, [questionID, newQuiz[q].input, correct])
            .then(res => {
              console.log('ANSWERS', res.rows[0])
            })
        })
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });



  return router;
};
