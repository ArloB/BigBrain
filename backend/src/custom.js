/*
 For a given data structure of a question, produce another
 object that doesn't contain any important meta data (e.g. the answer)
 to return to a "player"
*/
export const quizQuestionPublicReturn = question => {
  return {
    "multiple_choice": question.multiple_choice,
    "answers": quizQuestionGetAnswers(question),
    "time_limit": question.time_limit,
    "worth": question.worth
  };
};

/*
 For a given data structure of a question, get the IDs of
 the correct answers (minimum 1).
*/
export const quizQuestionGetCorrectAnswers = question => {
  const answers = []
  
  for (const x in question.answers) {
    if (question.answers[x].correct) {
      answers.push(question.answers[x].id)
    }
  }
  
  return answers;
};

/*
 For a given data structure of a question, get the IDs of
 all of the answers, correct or incorrect.
*/
export const quizQuestionGetAnswers = question => {
  let answers = []

  for (const x in question.answers) {
    answers.push(question.answers[x].id)
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
