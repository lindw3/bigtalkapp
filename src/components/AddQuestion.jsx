import { useState } from 'react';

function AddQuestion({ onAdd }) {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    onAdd({
      question: question.trim(),
      category: 'Egna frågor'
    });

    setQuestion('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Skriv en fråga"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button type="submit">Lägg till</button>
    </form>
  );
}

export default AddQuestion;
