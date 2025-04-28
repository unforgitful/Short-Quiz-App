import { useState } from 'react'
import questions from './Questions.jsx' //contains the questionnaires
import victory from './assets/yippie.gif'
import defeat from './assets/you-lost.webp'
import wsound from './assets/wsound.mp3'
import lsound from './assets/lsound.mp3'
import TryAgainButton from './TryAgainButton.jsx'


function App() {

  const [score, setScore] = useState (0);
  const [showScore, setShowScore] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0); //0 is the default index for the first question.
  

  const handleAnswerOption = (selectedAnswer) => {
    selectedAnswer === questions[currentQuestion].correctAnswer && setScore(score + 1);


    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      score == questions.length -1 && setshowText(true);
    }

  }

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  }


  return (
    <>
      <h1>Short Quiz App</h1>
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {questions.length}
          {score >= 3?(
            <div>
              <img src={victory} alt="Victory!" />
              {/* Add "control" next to autoplay for audio controls. */}
             <audio src={wsound} autoPlay  />
              <p>You passed the quiz! Yippie!</p>
              <TryAgainButton onReset={resetQuiz}></TryAgainButton>
            </div>
          ) : (
            <div>
              <img src={defeat} alt="Defeat..." />
              {/* Add "control" next to autoplay for audio controls. */}
              <audio src={lsound} autoPlay />
              <p>Better luck next time!</p>
                <TryAgainButton onReset={resetQuiz}></TryAgainButton>
            </div>
          )}
        </div>
      ):
      <>
      <div className="question-container">
        <div className="question-num">
          <span>Question {currentQuestion + 1}</span> / {questions.length}
        </div>
        <div className="question-text">{questions[currentQuestion].question}</div>
        <div className="question-answers">{questions[currentQuestion].options.map((option) =>
          (
            <button 
            className="answer-button" 
            key={option} 
            onClick={() => handleAnswerOption(option)}
            >
        {option}
        </button>))}</div>
      </div>
      </>
      
      }


    </>
  )
}

export default App
