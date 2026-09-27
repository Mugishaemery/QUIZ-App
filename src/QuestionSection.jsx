import React from 'react';

export default function QuestionSection({ 
  question, 
  selectedOption, 
  onOptionSelect, 
  isAnswered 
}) {
  return (
    <div className="question-section">
      <div className="question-header">
        <h3>Question {question.id}</h3>
      </div>
      <p className="question-text">{question.question}</p>
      
      <div className="options-list">
        {question.options.map((option, index) => {
          const isSelected = selectedOption === option;
          const isCorrect = option === question.correctAnswer;
          
          // Determine styling classes based on state
          let optionClass = "option-item";
          if (isAnswered) {
            if (isCorrect) optionClass += " correct";
            else if (isSelected && !isCorrect) optionClass += " incorrect";
          } else if (isSelected) {
            optionClass += " selected";
          }

          return (
            <div 
              key={index} 
              className={optionClass}
              onClick={() => !isAnswered && onOptionSelect(option)}
            >
              {option}
            </div>
          );
        })}
      </div>
    </div>
  );
}