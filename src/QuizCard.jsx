import React from 'react';
import QuestionSection from './QuestionSection';
import NavigationPanel from './NavigationPanel';
import ExplanationSection from './ExplanationSection';

export default function QuizCard({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  userAnswers,
  onOptionSelect,
  onNext,
  onPrev,
  onJumpToQuestion,
  quizData
}) {
  const selectedOption = userAnswers[currentQuestion.id];
  const isAnswered = !!selectedOption;

  return (
    <div className="quiz-card">
      <div className="quiz-main-content">
        
        <QuestionSection 
          question={currentQuestion}
          selectedOption={selectedOption}
          onOptionSelect={onOptionSelect}
          isAnswered={isAnswered}
        />

        <div className="action-buttons">
          <button 
            className="nav-btn" 
            onClick={onPrev} 
            disabled={currentQuestionIndex === 0}
          >
            Prev
          </button>
          <button 
            className="nav-btn" 
            onClick={onNext} 
            disabled={currentQuestionIndex === totalQuestions - 1}
          >
            Next
          </button>
        </div>

        {isAnswered && (
          <ExplanationSection explanation={currentQuestion.explanation} />
        )}
      </div>

      <div className="quiz-sidebar">
        <NavigationPanel 
          totalQuestions={totalQuestions}
          currentQuestionIndex={currentQuestionIndex}
          userAnswers={userAnswers}
          quizData={quizData}
          onJumpToQuestion={onJumpToQuestion}
        />
      </div>
    </div>
  );
}