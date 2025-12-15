import { useState } from 'react';

function AddQuestion({ onAdd }) {
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim() || !category.trim()) return;

    // Skicka alltid ett objekt med question + category
    onAdd({
      question: question.trim(),
      category: category.trim()
    });

    setQuestion('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Skriv en fråga"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <input
        placeholder="Kategori"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button type="submit">Lägg till</button>
    </form>
  );
}

export default AddQuestion;
