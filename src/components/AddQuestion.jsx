import { useState } from 'react';
import styles from '../App.module.css';
import { generateId } from '../utils/generateId';


export default function AddQuestion({ onAdd, ownQuestions, onDelete }) {
  const [questionText, setQuestionText] = useState('');
  const [btnPressed, setBtnPressed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    setBtnPressed(true);

    onAdd({
      id: generateId(),
      question: questionText.trim(),
      category: 'Egna frågor',
    });

    setQuestionText('');
    setTimeout(() => setBtnPressed(false), 300);
  };

  return (
    <>
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
          className={styles.primaryBtn}
          style={{
            backgroundColor: btnPressed ? '#000' : '#fff',
            color: btnPressed ? '#fff' : '#000',
            borderColor: '#000',
          }}
        >
          Lägg till
        </button>
      </form>

      {ownQuestions.length > 0 && (
        <>
        <div className={styles.questionList}>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>
            Tillagda frågor
          </h3>
          {ownQuestions.map(q => (
            <div key={q.id} className={styles.questionListItem}>
              <span>{q.question}</span>
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => onDelete(q.id)}
                aria-label="Ta bort fråga"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        </>
      )}
    </>
  );
}
