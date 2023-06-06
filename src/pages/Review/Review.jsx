import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuestionsStore, useReviewStore } from "../../store";
import "./Review.scss";

function Review() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionsData] = useQuestionsStore((state) => [state.questionsData]);
  const [reviewAnswers, setReviewAnswers] = useReviewStore((state) => [
    state.reviewAnswers,
    state.setReviewAnswers,
  ]);

  const navigate = useNavigate();

  const handleBackToHome = () => {
    setReviewAnswers([]);
    navigate("/");
  };

  const handlePlayAgain = () => {
    setReviewAnswers([]);
    navigate("/quizzes");
  };
  return (
    <main className="review">
      <div className="review-header">
        Question {currentQuestion + 1}/{questionsData.length}
      </div>
      <div className="review-question">
        {questionsData[currentQuestion].question}
      </div>
      <div className="review-answer">
        <div className="review-answer--yourAnswer">
          Your Answer: {reviewAnswers[currentQuestion]}
          {reviewAnswers[currentQuestion] ===
          questionsData[currentQuestion].correct_answer ? (
            <div className="review-answer--yourAnswer--correct">Correct</div>
          ) : (
            <div className="review-answer--yourAnswer--wrong">Wrong</div>
          )}
        </div>
        <div className="review-answer--correctAnswer">
          Correct Answer: {questionsData[currentQuestion].correct_answer}
        </div>
      </div>

      <div className="review-btn">
        <button
          onClick={() => setCurrentQuestion(currentQuestion - 1)}
          disabled={currentQuestion === 0}
          style={{
            opacity: currentQuestion === 0 ? ".5" : "1",
            cursor: currentQuestion === 0 ? "not-allowed" : "pointer",
          }}
        >
          Prev
        </button>
        <button
          onClick={() => setCurrentQuestion(currentQuestion + 1)}
          disabled={currentQuestion === questionsData.length - 1}
          style={{
            opacity: currentQuestion === questionsData.length - 1 ? ".5" : "1",
            cursor:
              currentQuestion === questionsData.length - 1
                ? "not-allowed"
                : "pointer",
          }}
        >
          Next
        </button>
      </div>
      <button className="back-to-home btn" onClick={handleBackToHome}>
        Home
      </button>
      <button className="play-again btn" onClick={handlePlayAgain}>
        Play Again
      </button>
    </main>
  );
}

export default Review;
