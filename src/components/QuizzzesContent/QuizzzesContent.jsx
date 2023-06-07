import { useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import { useNavigate } from "react-router-dom";
import { useQuestionsStore, useReviewStore, useTimeStore } from "../../store";
import "./QuizzesContent.scss";

function QuizzesContent({
  shuffledAnswers,
  currentQuestion,
  setCurrentQuestion,
}) {
  const [questionsData, score, setScore, selectedAnswer, setSelectedAnswer] =
    useQuestionsStore((state) => [
      state.questionsData,
      state.score,
      state.setScore,
      state.selectedAnswer,
      state.setSelectedAnswer,
    ]);
  const [time, setTime] = useTimeStore((state) => [state.time, state.setTime]);
  const [reviewAnswers, setReviewAnswers] = useReviewStore((state) => [
    state.reviewAnswers,
    state.setReviewAnswers,
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime(time + 1);
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, [time]);

  const formatTime = () => {
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handleAnswerClick = (answer) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answer);
    }
  };

  const isAnswerSelected = selectedAnswer !== null;

  const handleNextClick = () => {
    if (selectedAnswer !== null) {
      setSelectedAnswer(null);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmitClick = () => {
    if (selectedAnswer !== null) {
      setSelectedAnswer(null);
      setCurrentQuestion(currentQuestion + 1);
      navigate("/result");
    }
  };

  return (
    <div className="quizzes">
      <div className="quizzes-timer">{formatTime()}</div>
      <div className="quizzes-header">
        Question {currentQuestion + 1}/{questionsData.length}
      </div>
      <div className="quizzes-question">
        {ReactHtmlParser(questionsData[currentQuestion].question)}
      </div>
      <ul>
        {shuffledAnswers.map((answer, index) => {
          return (
            <li
              className={
                selectedAnswer === answer
                  ? answer === questionsData[currentQuestion].correct_answer
                    ? "correct"
                    : "wrong"
                  : ""
              }
              onClick={() => {
                setReviewAnswers([...reviewAnswers, answer]);
                handleAnswerClick(answer);
                if (answer === questionsData[currentQuestion].correct_answer) {
                  setScore(score + 1);
                }
              }}
              key={index}
              disabled={isAnswerSelected}
            >
              {ReactHtmlParser(answer)}
            </li>
          );
        })}
      </ul>
      {currentQuestion === questionsData.length - 1 ? (
        <button
          style={{
            opacity: selectedAnswer === null ? ".5" : "1",
            cursor: selectedAnswer === null ? "not-allowed" : "pointer",
          }}
          onClick={handleSubmitClick}
        >
          Submit
        </button>
      ) : (
        <button
          style={{
            opacity: selectedAnswer === null ? ".5" : "1",
            cursor: selectedAnswer === null ? "not-allowed" : "pointer",
          }}
          onClick={handleNextClick}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default QuizzesContent;
