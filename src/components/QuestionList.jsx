import React from 'react';

function QuestionList({ questions, onSelect }) {
  return (
    <ul>
      {questions.map((q, index) => (
        <li key={index} onClick={() => onSelect(index)}>
          {q.question} {/* alltid fråga */}
          <span style={{ marginLeft: '0.5rem', opacity: 0.6 }}>
            ({q.category})
          </span>
        </li>
      ))}
    </ul>
  );
}

export default QuestionList;

