import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Congratulation from "../.././assets/images/congrats.png";
import NiceTry from "../.././assets/images/nicetry.png";
import { useQuestionsStore, useReviewStore, useTimeStore } from "../../store";
import "./Result.scss";

function Result() {
  const [score, setScore, questionsData] = useQuestionsStore((state) => [
    state.score,
    state.setScore,
    state.questionsData,
  ]);
  const [time, setTime] = useTimeStore((state) => [state.time, state.setTime]);
  const [setReviewAnswers] = useReviewStore((state) => [
    state.setReviewAnswers,
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const navigate = useNavigate();

  const handlePlayAgain = () => {
    setTime(0);
    setScore(0);
    setReviewAnswers([]);
    navigate("/quizzes");
  };

  const handleReview = () => {
    setTime(0);
    setScore(0);
    navigate("/review");
  };

  const handleBackToHome = () => {
    setTime(0);
    setScore(0);
    navigate("/");
  };

  return (
    <main className="result">
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
        <div className="result-card">
          {score < questionsData.length - 1 ? (
            <>
              <div className="result-card--image">
                <img src={NiceTry} alt="NiceTry" loading="lazy" />
              </div>
              <div>Better luck next time!</div>
              <div>
                {score}/{questionsData.length} correct answers in {time} seconds
              </div>
            </>
          ) : (
            <>
              <div className="result-card--image">
                <img src={Congratulation} alt="Congratulation" loading="lazy" />
              </div>
              <div>You are amazing!</div>
              <div>
                {score}/{questionsData.length} correct answers in {time} seconds
              </div>
            </>
          )}
          <div className="result-card--btn">
            <button onClick={handleReview}>Review</button>
            <button onClick={handlePlayAgain}>Play Again</button>
          </div>

          <button className="back-to-home" onClick={handleBackToHome}>
            Back To Home
          </button>
        </div>
      )}
    </main>
  );
}

export default Result;
