const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query('SELECT * FROM quizzes;')
      .then(result => {
        const quizzes = result.rows;
        const templateVars = { quizzes };
        res.render("quizzes", templateVars);
      });
    //const templateVars = {user: req.session["userID"]}
  });

  //SELECT QUIZ -- GET
  router.get("/:id", (req, res) => {
    db.query(`
    SELECT questions.id, questions.question, quizzes.name
    FROM questions
    JOIN quizzes ON quiz_id = quizzes.id
    WHERE quiz_id = $1;
    `, [req.params.id])
      .then(result => {
        let questionID = result.rows;
        //console.log(questionID[0].id);
        db.query(`
     SELECT question_id, answers.answer, answers.correct
     FROM questions
     JOIN quizzes ON quiz_id = quizzes.id
     JOIN answers ON question_id = questions.id
     WHERE quiz_id = $1;
     `, [req.params.id])
          .then(ans => {
            let answerID = ans.rows;
            let questionsObject = {};
            let answersArr = [];
            // console.log('Answers: ', answerID);
            // console.log('Quiz: ', questionID);
            for (let i = 0; i < questionID.length; i++) {
              questionsObject[i] = {
                quiz_id: req.params.id,
                name: questionID[i].name,
                question: questionID[i].question
              };
              for (let j = 0; j < answerID.length; j++) {
                if (questionID[i].id === answerID[j].question_id) {
                  answersArr.push(answerID[j].answer);
                  questionsObject[i].answer = answersArr;
                }
              }
              answersArr = [];
            }
            console.log(questionsObject);
            let templateVars = { questionsObject };

            res.render("quiz_selected", templateVars);
          })
          .catch(err => {
            console.log(err);
          });

      })
      .catch(err => {
        console.log(err);
      });

  });

  return router;
};
