import { useState } from 'react';
import styles from '../App.module.css';

export default function AddQuestion({ onAdd }) {
  const [questionText, setQuestionText] = useState('');
  const [btnPressed, setBtnPressed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    // Kortvarig knapp-effekt
    setBtnPressed(true);

    onAdd({
      question: questionText.trim(),
      category: 'Egna frågor', // automatiskt
    });

    setQuestionText('');

    setTimeout(() => setBtnPressed(false), 300); // återställ knapp-effekt
  };

  return (
    <form className={styles.addQuestionForm} onSubmit={handleSubmit}>
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Skriv ny fråga..."
          required
          rows={2}
          maxLength={200}
        />

      <button
        type="submit"
        style={{
          backgroundColor: btnPressed ? '#000' : '#fff',
          color: btnPressed ? '#fff' : '#000',
          borderColor: '#000', // alltid svart
        }}
      >
        Lägg till
      </button>
    </form>
  );
}
