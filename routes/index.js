const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query('SELECT * FROM quizzes WHERE private = false')
    .then(result => {
      const quizzes = result.rows;
      const templateVars = { quizzes };
      console.log(result.rows)
      res.render("index", templateVars);
    })
    //const templateVars = {user: req.session["userID"]}
  });
  return router;
};
