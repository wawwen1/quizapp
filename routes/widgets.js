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
    let query = `SELECT * FROM widgets`;
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
    console.log(req.body);
    const { name, description, private }= req.body;
    const { q1, input1, answer1 } = req.body;
    const { q2, input2, answer2 } = req.body;
    const { q3, input3, answer3 } = req.body;

    console.log(name);
    console.log(description);
    console.log(`${q1}, ${input1}, ${answer1}`);
    console.log(`${q2}, ${input2}, ${answer2}`);
    console.log(`${q3}, ${input3}, ${answer3}`);
    console.log(private);
  });



  return router;
};
