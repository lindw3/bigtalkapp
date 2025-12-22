import { useState, useCallback, memo } from 'react';
import styles from '../App.module.css';
import { generateId } from '../utils/generateId';

// --- Memoized list item för snabb rendering ---
const QuestionListItem = memo(function ({ question, onDelete }) {
  return (
    <div className={styles.questionListItem}>
      <span>{question.question}</span>
      <button
        type="button"
        className={styles.deleteBtn}
        onClick={() => onDelete(question.id)}
        aria-label="Ta bort fråga"
      >
        ✕
      </button>
    </div>
  );
});

export default function AddQuestion({ onAdd, ownQuestions, onDelete }) {
  const [questionText, setQuestionText] = useState('');
  const [btnPressed, setBtnPressed] = useState(false);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const trimmed = questionText.trim();
      if (!trimmed) return;

      setBtnPressed(true);

      onAdd({
        id: generateId(),
        question: trimmed,
        category: 'Egna frågor',
      });

      setQuestionText('');
      setTimeout(() => setBtnPressed(false), 300);
    },
    [questionText, onAdd]
  );

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
          className={`${styles.primaryBtn} ${btnPressed ? styles.active : ''}`}
        >
          Lägg till
        </button>
      </form>

      {ownQuestions.length > 0 && (
        <div className={styles.questionList}>
          <h3 className={styles.questionListTitle}>Tillagda frågor</h3>
          {ownQuestions.map((q) => (
            <QuestionListItem key={q.id} question={q} onDelete={onDelete} />
          ))}
        </div>
      )}
    </>
  );
}
