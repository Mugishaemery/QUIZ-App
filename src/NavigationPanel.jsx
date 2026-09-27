import React from 'react';

export default function NavigationPanel({ 
  totalQuestions, 
  currentQuestionIndex, 
  userAnswers, 
  quizData, 
  onJumpToQuestion 
}) {
  return (
    <div className="navigation-panel">
      <div className="nav-header">
        <span>Question {currentQuestionIndex + 1}/{totalQuestions}</span>
        <a href="#" className="help-link">Need Help ?</a>
      </div>
      
      <div className="question-grid">
        {quizData.map((q, index) => {
          const isCurrent = index === currentQuestionIndex;
          const isAnswered = !!userAnswers[q.id];
          
          let btnClass = "grid-btn";
          if (isCurrent) btnClass += " current";
          else if (isAnswered) btnClass += " answered";

          return (
            <button 
              key={q.id} 
              className={btnClass}
              onClick={() => onJumpToQuestion(index)}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}