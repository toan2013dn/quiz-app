import { useEffect, useState } from "react";
import QuizzesContent from "../../components/QuizzzesContent/QuizzzesContent";
import { useQuestionsStore } from "../../store";
import "./Quizzes.scss";

function Quizzes() {
  const [setQuestionsData] = useQuestionsStore((state) => [
    state.setQuestionsData,
  ]);
  const [isLoading, setIsLoading] = useState(true);

  const URL = `https://opentdb.com/api.php?amount=5`;

  useEffect(() => {
    const fetchQuestionsData = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        const formattedResults = data.results.map((result) => ({
          ...result,
          question: result.question.replace(/(&quot;|&#039;)/g, '"'),
          correct_answer: result.correct_answer.replace(
            /(&quot;|&#039;)/g,
            '"'
          ),
          incorrect_answers: result.incorrect_answers.map((answer) =>
            answer.replace(/(&quot;|&#039;)/g, "'")
          ),
        }));
        setQuestionsData(formattedResults);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchQuestionsData();
  }, []);

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
        <QuizzesContent setIsLoading={setIsLoading} />
      )}
    </main>
  );
}

export default Quizzes;
