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

  router.get("/:id", (req, res) => {
    //const templateVars = {user: req.session["userID"]}
    db.query(`SELECT * FROM questions WHERE quiz_id = $1;`, [req.params.id])
      .then(result => {
        console.log("+++++++++++", result.rows)
        const templateVars = {questions: result.rows, quiz_id: req.params.id }
        return res.render("quiz_selected", templateVars)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    // res.render("quizzes")
  });

  return router;
};

