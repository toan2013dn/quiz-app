import "./LandingPage.scss";
import { useNavigate } from "react-router-dom";
import BackGroundImage from "../.././assets/images/background.png";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="landing-page">
      <div className="landing-page--image">
        <img src={BackGroundImage} alt="background" />
      </div>
      <button
        className="landing-page--button"
        onClick={() => navigate("/quizzes")}
      >
        Start Quiz!
      </button>
    </div>
  );
}

export default LandingPage;
