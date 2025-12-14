import React from 'react';

function QuestionList({ questions, onSelect }) {
  if (questions.length === 0) return <p>No questions yet.</p>;

  return (
    <ul>
      {questions.map((q, index) => (
        <li
          key={index}
          onClick={() => onSelect(index)}
          style={{ cursor: 'pointer', marginBottom: '0.5rem' }}
        >
          {q}
        </li>
      ))}
    </ul>
  );
}

export default QuestionList;
