import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuestionsStore, useReviewStore, useTimeStore } from "../../store";
import "./Quizzes.scss";

function Quizzes() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [
    questionsData,
    score,
    setScore,
    setQuestionsData,
    selectedAnswer,
    setSelectedAnswer,
  ] = useQuestionsStore((state) => [
    state.questionsData,
    state.score,
    state.setScore,
    state.setQuestionsData,
    state.selectedAnswer,
    state.setSelectedAnswer,
  ]);
  const [time, setTime] = useTimeStore((state) => [state.time, state.setTime]);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewAnswers, setReviewAnswers] = useReviewStore((state) => [
    state.reviewAnswers,
    state.setReviewAnswers,
  ]);
  const navigate = useNavigate();
  const URL = "https://opentdb.com/api.php?amount=5";

  useEffect(() => {
    const fetchQuestionsData = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        setQuestionsData(data.results);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchQuestionsData();
  }, []);

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
    <main className="quizzes">
      {isLoading ? (
        <div className="music-waves-2">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : (
        <>
          <div className="quizzes-timer">{formatTime()}</div>
          <div className="quizzes-header">
            Question {currentQuestion + 1}/{questionsData.length}
          </div>
          <div className="quizzes-question">
            {questionsData[currentQuestion].question}
          </div>
          <ul>
            {questionsData[currentQuestion].incorrect_answers.map(
              (incorrectAnswer, index) => {
                return (
                  <li
                    className={
                      selectedAnswer === incorrectAnswer ? "wrong" : ""
                    }
                    onClick={() => {
                      setReviewAnswers([...reviewAnswers, incorrectAnswer]);
                      handleAnswerClick(incorrectAnswer);
                    }}
                    key={index}
                    disabled={isAnswerSelected}
                  >
                    {incorrectAnswer}
                  </li>
                );
              }
            )}
            <li
              className={
                selectedAnswer === questionsData[currentQuestion].correct_answer
                  ? "correct"
                  : ""
              }
              disabled={isAnswerSelected}
              onClick={() => {
                setScore(score + 1);
                handleAnswerClick(
                  questionsData[currentQuestion].correct_answer
                );
                setReviewAnswers([
                  ...reviewAnswers,
                  questionsData[currentQuestion].correct_answer,
                ]);
              }}
            >
              {questionsData[currentQuestion].correct_answer}
            </li>
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
        </>
      )}
    </main>
  );
}

export default Quizzes;
