/*
 For a given data structure of a question, produce another
 object that doesn't contain any important meta data (e.g. the answer)
 to return to a "player"
*/
export const quizQuestionPublicReturn = question => {
  console.log('See question: ', question);
  return {
    "multiple_choice": question.multiple_choice,
    "question": question.question,
    "time_limit": question.time_limit,
    "worth": question.worth,
    "graphic": question.graphic
  };
};

/*
 For a given data structure of a question, get the IDs of
 the correct answers (minimum 1).
*/
export const quizQuestionGetCorrectAnswers = question => {
  answers = []
  for (x in question.answers) {
    if (question.answers[x].correct) {
      answers.push(question.answers[x])
    }
  }
  return answers;
};

/*
 For a given data structure of a question, get the IDs of
 all of the answers, correct or incorrect.
*/
export const quizQuestionGetAnswers = question => {
  answers = []
  for (x in question.answers) {
    answers.push(question.answers[x])
  }
  return answers;
};

/*
 For a given data structure of a question, get the duration
 of the question once it starts. (Seconds)
*/
export const quizQuestionGetDuration = question => {
  return question.time_limit
};
