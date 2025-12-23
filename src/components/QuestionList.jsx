
import { useLocale } from '../locale/LocaleContext';

function QuestionList({ questions, onSelect }) {
  const { t, lang } = useLocale();

  return (
    <ul>
      {questions.map((q) => {
        const text = typeof q.question === 'string' ? q.question : (q.question && (q.question[lang] || q.question.sv || ''));
        const catLabel = t(`categories.${q.category}`) || q.category;
        return (
        <li
          key={q.id}
          onClick={() => onSelect(q.id)}
        >
          {text}
          <span style={{ marginLeft: '0.5rem', opacity: 0.6 }}>
            ({catLabel})
          </span>
        </li>
      )})}
    </ul>
  );
}

export default QuestionList;

