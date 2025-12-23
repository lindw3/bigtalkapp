
function QuestionList({ questions, onSelect }) {
  return (
    <ul>
      {questions.map((q) => (
        <li
          key={q.id}
          onClick={() => onSelect(q.id)}
        >
          {q.question}
          <span style={{ marginLeft: '0.5rem', opacity: 0.6 }}>
            ({q.category})
          </span>
        </li>
      ))}
    </ul>
  );
}

export default QuestionList;

