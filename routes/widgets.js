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

    const newQuiz = [ q1, q2, q3 ];
    console.log(q1);
    if (private === undefined) {
      private = false;
    }

    if (!name || !description || !q1.question || !q2.question || !q3.question) {
      return res.send("Please fill out the quiz completely! Go back");
    }

    //store quiz description
    db.query(`
    INSERT INTO quizzes (owner_id, name, description, private)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `, [req.params.id, name, description, private])
      .then(res => {
      let quizID = res.rows[0].id;
      console.log(quizID);

      //store question details
     for (const quiz of newQuiz) {
       console.log(quiz);
       db.query(`
       INSERT INTO questions (quiz_id, question)
       VALUES ($1, $2)
       RETURNING *;
       `, [quizID, quiz.question])
       .then(res => {
        let questionID = res.rows[0].id;
         console.log('QUESTION ID IS EQUAL TO: ', questionID);
         for (let i = 1; i <= quiz.input.length; i++) {

          //store correct answers
           if (i === parseInt(quiz.answer)) {
             db.query(`
             INSERT INTO answers (question_id, answer, correct)
             VALUES ($1, $2, $3)
             RETURNING *;
             `, [questionID, quiz.input[i-1], true])
             .then(res => {
              console.log('STORING CORRECT ANSWER TO DB: ', quiz.input[i-1]);
             })
             .catch(err => {
               console.log(err);
             })

          //store wrong answers
           } else {
            db.query(`
            INSERT INTO answers (question_id, answer, correct)
            VALUES ($1, $2, $3)
            RETURNING *;
            `, [questionID, quiz.input[i-1], false])
            .then(res => {
             console.log('STORING WRONG ANSWER TO DB: ', quiz.input[i-1]);
            })
            .catch(err => {
              console.log(err);
            })
          }
        }
      })
       .catch(err => {
         console.log(err);
       })
     }
      })
      .catch(err => {
        console.log(err);
    });

      return res.redirect("/quizzes");
  });
  return router;
};
