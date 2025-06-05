const { useState } = React;


function QuizGame() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option) => {
    if (option === questions[current].answer) {
      setScore(score + 1);
    }
    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div>
        <h2>Quiz Complete!</h2>
        <p>Your score: {score} / {questions.length}</p>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div>
      <h2>{q.text}</h2>
      {q.options.map((option, idx) => (
        <button key={idx} onClick={() => handleAnswer(option)}>
          {option}
        </button>
      ))}
      <p>Question {current + 1} of {questions.length}</p>
      <p>Score: {score}</p>
    </div>
  );
}

window.QuizGame = QuizGame;
