import { useState, useEffect, useRef } from 'react';
import logo from './assets/bta_logotype.svg';
import styles from './App.module.css';
import defaultQuestions from './data/defaultQuestions';
import AddQuestion from './components/AddQuestion';
import Settings from './components/Settings';
import FooterNav from './components/FooterNav';

function App() {
  // --------------------
  // QUESTIONS
  // --------------------
  const [questions, setQuestions] = useState(() => {
    const saved = localStorage.getItem('questions');
    if (!saved) return defaultQuestions;

    return JSON.parse(saved).map(q => ({
      ...q,
      id: q.id ?? crypto.randomUUID(),
    }));
  });

  // --------------------
  // UI STATE
  // --------------------
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [view, setView] = useState('main'); // main | add | settings
  const [animating, setAnimating] = useState(false);
  const [btnPressed, setBtnPressed] = useState(false);

  // --------------------
  // CATEGORIES
  // --------------------
  const allCategories = [...new Set(questions.map(q => q.category))];
  const [enabledCategories, setEnabledCategories] = useState(() => {
    const saved = localStorage.getItem('enabledCategories');
    return saved ? JSON.parse(saved) : allCategories;
  });
  const prevCategoriesRef = useRef(allCategories);

  // --------------------
  // SEEN QUESTIONS (för "alla frågor innan repetition")
  // --------------------
  const [seenQuestionIds, setSeenQuestionIds] = useState(() => {
    const saved = localStorage.getItem('seenQuestionIds');
    return saved ? JSON.parse(saved) : [];
  });

  // --------------------
  // LOCALSTORAGE
  // --------------------
  useEffect(() => {
    localStorage.setItem('questions', JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem('enabledCategories', JSON.stringify(enabledCategories));
  }, [enabledCategories]);

  useEffect(() => {
    localStorage.setItem('seenQuestionIds', JSON.stringify(seenQuestionIds));
  }, [seenQuestionIds]);

  // --------------------
  // SYNC NEW CATEGORIES
  // --------------------
  useEffect(() => {
    const prevCategories = prevCategoriesRef.current;
    const genuinelyNew = allCategories.filter(
      cat => !prevCategories.includes(cat)
    );

    if (genuinelyNew.length > 0) {
      setEnabledCategories(prev => [...prev, ...genuinelyNew]);
    }

    prevCategoriesRef.current = allCategories;
  }, [allCategories]);

  // --------------------
  // FILTER QUESTIONS
  // --------------------
  const filteredQuestions = questions.filter(q =>
    enabledCategories.includes(q.category)
  );

  // --------------------
  // RANDOM QUESTION LOGIC
  // --------------------
  const getRandomQuestion = () => {
    if (filteredQuestions.length === 0) return null;

    // tillgängliga frågor = filtrerade minus redan sedda
    let availableQuestions = filteredQuestions.filter(
      q => !seenQuestionIds.includes(q.id)
    );

    // om alla har visats → återställ
    if (availableQuestions.length === 0) {
      setSeenQuestionIds([]);
      availableQuestions = filteredQuestions;
    }

    // om endast en fråga finns kvar
    if (availableQuestions.length === 1) return availableQuestions[0];

    // slumpa ny fråga (inte samma som aktuell)
    let next;
    do {
      next = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    } while (activeQuestion && next.id === activeQuestion.id);

    return next;
  };

  const nextQuestion = () => {
    if (animating) return;
    setAnimating(true);

    setTimeout(() => {
      const next = getRandomQuestion();
      setActiveQuestion(next);

      if (next) {
        setSeenQuestionIds(prev => [...prev, next.id]);
      }

      setAnimating(false);
    }, 300);
  };

  const handleNextQuestion = () => {
    setBtnPressed(true);
    nextQuestion();
    setTimeout(() => setBtnPressed(false), 350);
  };

  // --------------------
  // INITIAL QUESTION
  // --------------------
  useEffect(() => {
    if (!activeQuestion && filteredQuestions.length > 0) {
      const next = getRandomQuestion();
      setActiveQuestion(next);
      if (next) setSeenQuestionIds([next.id]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --------------------
  // OWN QUESTIONS
  // --------------------
  const ownQuestions = questions.filter(
    q => q.category === 'Egna frågor'
  );

  const deleteQuestion = (id) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
    setSeenQuestionIds(prev => prev.filter(seenId => seenId !== id));
  };

  // --------------------
  // RENDER
  // --------------------
  return (
    <div className={styles.app}>
      <div className={styles.wrapper} style={{ padding: 'env(safe-area-inset, var(--space-4))' }}>
        {/* HEADER */}
        <header className={styles.header}>
          <img src={logo} alt="BigTalk logo" className={styles.logo} />
          <h1 className={styles.title}>BigTalk</h1>
          <h2 className={styles.subtitle}>App</h2>
        </header>

        {/* MAIN */}
        <main className={styles.main} style={{ flex: 1 }}>
          {view === 'main' && (
            <div className={styles.card}>
              <div
                className={`${styles.questionText} ${
                  animating
                    ? styles['fade-slide-out']
                    : styles['fade-slide-in']
                }`}
              >
                {activeQuestion
                  ? activeQuestion.question
                  : 'Inga frågor matchar dina inställningar'}
              </div>

              <button
                className={styles.primaryBtn}
                onClick={handleNextQuestion}
                style={{
                  backgroundColor: btnPressed ? '#000' : '#fff',
                  color: btnPressed ? '#fff' : '#000',
                  borderColor: '#000',
                }}
              >
                Ny fråga
              </button>
            </div>
          )}

          {view === 'add' && (
            <AddQuestion
              onAdd={(q) => {
                setQuestions(prev => [...prev, q]);
              }}
              ownQuestions={ownQuestions}
              onDelete={deleteQuestion}
            />
          )}

          {view === 'settings' && (
            <Settings
              categories={allCategories}
              enabled={enabledCategories}
              setEnabled={setEnabledCategories}
            />
          )}
        </main>

        <FooterNav view={view} setView={setView} />
      </div>
    </div>
  );
}

export default App;
