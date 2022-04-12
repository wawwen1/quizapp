const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    //const templateVars = {user: req.session["userID"]}
    res.render("quizzes")
  });

  router.get("/:id", (req, res) => {
    //const templateVars = {user: req.session["userID"]}
    db.query(`SELECT * FROM questions WHERE quiz_id = $1;`, [req.params.id])
      .then(res => {
        console.log(res.rows)
        const templateVars = {questions: res.rows}
        return res.render('quizpage', templateVars)
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

