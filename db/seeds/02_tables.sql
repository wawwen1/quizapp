INSERT INTO users ( username, password )
VALUES
('testuser1', 'test1'),
('testuser2', 'test2');

INSERT INTO quizzes ( name, listed , created , description, owner_id )
VALUES
('quiz1', true, '01/01/2020','texttexttexttexttexttext', 1),
('quiz2', true, '01/01/2020','texttexttexttexttexttext', 1),
('quiz3', true, '01/01/2020','texttexttexttexttexttext', 1);

INSERT INTO questions ( quiz_id, question )
  VALUES
  (1, 'texttexttexttexttexttexttexttexttexttexttexttextQUESTION1'),
  (2, 'texttexttexttexttexttexttexttexttexttexttexttextQUESTION2'),
  (3, 'texttexttexttexttexttexttexttexttexttexttexttextQUESTION3');

INSERT INTO answers ( answer, question_id, correct ) VALUES
	 ('texttexttexttexttexttexttexttexttexttexttexttextBUT ALSO CORRECT',1, true),
	 ('texttexttexttexttexttexttexttexttexttexttexttext',1, false),
	 ('texttexttexttexttexttexttexttexttexttexttexttext',1, false),
   ('texttexttexttexttexttexttexttexttexttexttexttext',1, false),
	 ('texttexttexttexttexttexttexttexttexttexttexttext',2, false),
	 ('texttexttexttexttexttexttexttexttexttexttexttextQUESTION 2 BUT ALSO TRUE',2, true),
   ('texttexttexttexttexttexttexttexttexttexttexttext',2, false),
	 ('texttexttexttexttexttexttexttexttexttexttexttext',2, false),
   ('texttexttexttexttexttexttexttexttexttexttexttext',3, false),
	 ('texttexttexttexttexttexttexttexttexttexttexttext',3, false),
   ('texttexttexttexttexttexttexttexttexttexttexttextQUESTION 3 BUT ALSO TRUE',3, true),
	 ('texttexttexttexttexttexttexttexttexttexttexttext',3, false);
