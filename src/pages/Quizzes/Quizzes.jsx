import { useEffect, useState } from "react";
import QuizzesContent from "../../components/QuizzzesContent/QuizzzesContent";
import { useQuestionsStore } from "../../store";
import "./Quizzes.scss";

function Quizzes() {
  const [questionsData, setQuestionsData] = useQuestionsStore((state) => [
    state.questionsData,
    state.setQuestionsData,
  ]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  const URL = `https://opentdb.com/api.php?amount=5`;

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
    if (questionsData.length > 0) {
      const currentQuestionData = questionsData[currentQuestion];
      const answers = currentQuestionData.incorrect_answers.concat(
        currentQuestionData.correct_answer
      );
      const shuffledAnswers = answers.sort(() => Math.random() - 0.5);
      setShuffledAnswers(shuffledAnswers);
    }
  }, [questionsData, currentQuestion]);

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
        <QuizzesContent
          shuffledAnswers={shuffledAnswers}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
        />
      )}
    </main>
  );
}

export default Quizzes;
