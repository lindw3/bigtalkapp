import { useState, useCallback, memo } from 'react';
import styles from '../App.module.css';
import { generateId } from '../utils/generateId';
import { useLocale } from '../locale/LocaleContext';

// --- Memoized list item för snabb rendering ---
const QuestionListItem = memo(function ({ question, onDelete }) {
  const { t, lang } = useLocale();
  const text = typeof question.question === 'string' ? question.question : (question.question && (question.question[lang] || question.question.sv || ''));

  return (
    <div className={styles.questionListItem}>
      <span>{text}</span>
      <button
        type="button"
        className={styles.deleteBtn}
        onClick={() => onDelete(question.id)}
        aria-label={t('deleteQuestion')}
      >
        ✕
      </button>
    </div>
  );
});

export default function AddQuestion({ onAdd, ownQuestions, onDelete }) {
  const [questionText, setQuestionText] = useState('');
  const [btnPressed, setBtnPressed] = useState(false);

  const { t } = useLocale();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const trimmed = questionText.trim();
      if (!trimmed) return;

      setBtnPressed(true);

      onAdd({
        id: generateId(),
        // user added questions are stored as plain text (no translations)
        question: trimmed,
        category: 'ownQuestions',
      });

      setQuestionText('');
      setTimeout(() => setBtnPressed(false), 150);
    },
    [questionText, onAdd]
  );

  return (
    <>
      <form className={styles.addQuestionForm} onSubmit={handleSubmit}>
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder={t('addQuestionPlaceholder')}
          required
          rows={2}
          maxLength={200}
        />

        <button
          className={styles.secondaryBtn}
          style={{
                  backgroundColor: btnPressed ? 'var(--c-fg)' : 'var(--c-bg)',
                  color: btnPressed ? 'var(--c-bg)' : 'var(--c-fg)',
                  borderColor: 'var(--c-border)',
                }}
          >
          {t('addButton')}
        </button>
      </form>

      {ownQuestions.length > 0 && (
        <div className={styles.questionList}>
          <h3 className={styles.questionListTitle}>{t('addedQuestions')}</h3>
          {ownQuestions.map((q) => (
            <QuestionListItem key={q.id} question={q} onDelete={onDelete} />
          ))}
        </div>
      )}
    </>
  );
}
