import React, { useState } from 'react';
import './App.css';

const quizData = [
  {
    id: 1,
    question: "A train passes a station platform in 36 seconds and a man standing on the platform in 20 seconds. If the speed of the train is 54 km/hr, what is the length of the platform?",
    options: ["120 m", "240 m", "300 m", "None of these"],
    correctAnswer: "240 m",
    explanation: "Speed = 54 km/hr = 15 m/sec. Length of train = 15 × 20 = 300 m. Let platform length be x. (x + 300) / 36 = 15 => x + 300 = 540 => x = 240 m."
  },
  {
    id: 2,
    question: "What is the capital city of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    correctAnswer: "Canberra",
    explanation: "While Sydney and Melbourne are larger cities, Canberra was specifically chosen as a compromise capital in 1908 and is the official capital of Australia."
  },
  {
    id: 3,
    question: "Which planet is known as the 'Red Planet'?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
    explanation: "Mars appears red because its surface is covered in iron oxide (rust). This gives the planet its distinctive reddish appearance when viewed from Earth."
  },
  {
    id: 4,
    question: "What is 15% of 200?",
    options: ["15", "20", "25", "30"],
    correctAnswer: "30",
    explanation: "To find 15% of 200: (15 ÷ 100) × 200 = 0.15 × 200 = 30. A quick shortcut is to find 10% (20) and 5% (10), then add them together: 20 + 10 = 30."
  },
  {
    id: 5,
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: "William Shakespeare",
    explanation: "William Shakespeare wrote 'Romeo and Juliet' in the 1590s. It is one of his most famous tragedies and tells the story of two young star-crossed lovers."
  },
  {
    id: 6,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean",
    explanation: "The Pacific Ocean is the largest and deepest ocean, covering about 63 million square miles (165 million square km) — larger than all of Earth's land area combined."
  },
  {
    id: 7,
    question: "If a car travels at 60 km/h for 2.5 hours, how far does it travel?",
    options: ["120 km", "140 km", "150 km", "180 km"],
    correctAnswer: "150 km",
    explanation: "Distance = Speed × Time. So, 60 km/h × 2.5 hours = 150 km."
  },
  {
    id: 8,
    question: "What is the chemical symbol for Gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: "Au",
    explanation: "The chemical symbol for Gold is 'Au', which comes from the Latin word 'Aurum', meaning 'shining dawn'. 'Ag' is the symbol for Silver."
  }
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const currentQuestion = quizData[currentIndex];
  const selectedAnswer = userAnswers[currentQuestion.id];
  const isAnswered = selectedAnswer !== undefined;

  const handleOptionClick = (option) => {
    if (isAnswered) return;
    setUserAnswers({
      ...userAnswers,
      [currentQuestion.id]: option
    });
  };

  const goToNext = () => {
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const jumpToQuestion = (index) => {
    setCurrentIndex(index);
  };

  const finishQuiz = () => {
    setIsQuizFinished(true);
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setUserAnswers({});
    setIsQuizFinished(false);
  };

  const calculateScore = () => {
    let score = 0;
    quizData.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  if (isQuizFinished) {
    const score = calculateScore();
    const total = quizData.length;
    const percentage = Math.round((score / total) * 100);

    return (
      <div className="app-container">
        <h1 className="quiz-title">Quiz</h1>
        <div className="results-card">
          <h2>Quiz Complete! 🎉</h2>
          <div className="score-display">
            <p className="score-number">{score} / {total}</p>
            <p className="score-percentage">{percentage}%</p>
          </div>
          <p className="score-message">
            {percentage >= 80 && "Excellent work! 🌟"}
            {percentage >= 50 && percentage < 80 && "Good job! Keep practicing. 👍"}
            {percentage < 50 && "Don't give up! Try again. 💪"}
          </p>
          <button className="restart-btn" onClick={restartQuiz}>
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <h1 className="quiz-title">Quiz</h1>

      <div className="quiz-layout">
        <div className="main-content">
          <div className="question-box">
            <h3>Question {currentIndex + 1}</h3>
            <p>{currentQuestion.question}</p>
          </div>

          <div className="options-container">
            {currentQuestion.options.map((option, index) => {
              let buttonClass = "option-btn";
              if (isAnswered) {
                if (option === currentQuestion.correctAnswer) {
                  buttonClass += " correct";
                } else if (option === selectedAnswer) {
                  buttonClass += " wrong";
                }
              }

              return (
                <button
                  key={index}
                  className={buttonClass}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </button>
              );
            })}
          </div>

          <div className="nav-buttons">
            <button onClick={goToPrev} disabled={currentIndex === 0}>Prev</button>
            
            {currentIndex === quizData.length - 1 ? (
              <button 
                onClick={finishQuiz} 
                className="finish-btn"
                disabled={!isAnswered}
              >
                Submit Quiz
              </button>
            ) : (
              <button onClick={goToNext}>Next</button>
            )}
          </div>

          {isAnswered && (
            <div className="explanation-box">
              <h4>Explanation</h4>
              <p>{currentQuestion.explanation}</p>
            </div>
          )}
        </div>

        <div className="sidebar">
          <div className="sidebar-header">
            <span>Question {currentIndex + 1}/{quizData.length}</span>
            <span className="help-text">Need Help ?</span>
          </div>

          <div className="grid-container">
            {quizData.map((q, index) => {
              let gridBtnClass = "grid-btn";
              if (index === currentIndex) {
                gridBtnClass += " active";
              } else if (userAnswers[q.id]) {
                gridBtnClass += " completed";
              }

              return (
                <button
                  key={q.id}
                  className={gridBtnClass}
                  onClick={() => jumpToQuestion(index)}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}