INSERT INTO quizzes (name, listed , created , description)
VALUES
('quiz1', true, '01/01/2020','texttexttexttexttexttext'),
('quiz2', true, '01/01/2020','texttexttexttexttexttext'),
('quiz3', true, '01/01/2020','texttexttexttexttexttext');

INSERT INTO questions (quiz_id,text)
  VALUES
  (1, 'texttexttexttexttexttexttexttexttexttexttexttext'),
  (2, 'texttexttexttexttexttexttexttexttexttexttexttext'),
  (3, 'texttexttexttexttexttexttexttexttexttexttexttext');

INSERT INTO public.answers (answer,question_id, correct) VALUES
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
