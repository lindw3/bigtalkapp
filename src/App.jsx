
import { useState, useEffect } from 'react';
import logo from './assets/bta_logotype.svg';
import styles from './App.module.css';
import defaultQuestions from './data/defaultQuestions';
import AddQuestion from './components/AddQuestion';
import Settings from './components/Settings';
import FooterNav from './components/FooterNav';

function App() {
  // --------------------
  // DATA
  // --------------------
  const [questions, setQuestions] = useState(() => {
    const saved = localStorage.getItem('questions');
    return saved ? JSON.parse(saved) : defaultQuestions;
  });

  const [activeQuestion, setActiveQuestion] = useState(null);
  const [view, setView] = useState('main'); // 'main' | 'add' | 'settings'

  const [enabledCategories, setEnabledCategories] = useState(() => {
    const saved = localStorage.getItem('enabledCategories');
    return saved ? JSON.parse(saved) : null;
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  // --------------------
  // PERSISTENCE
  // --------------------
  useEffect(() => {
    localStorage.setItem('questions', JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    if (enabledCategories) {
      localStorage.setItem('enabledCategories', JSON.stringify(enabledCategories));
    }
  }, [enabledCategories]);

  // --------------------
  // CATEGORIES
  // --------------------
  const allCategories = [...new Set(questions.map(q => q.category))];

  useEffect(() => {
    if (!enabledCategories && allCategories.length > 0) {
      setEnabledCategories(allCategories);
    }
  }, [allCategories, enabledCategories]);

  useEffect(() => {
    if (!enabledCategories) return;

    const missingCategories = allCategories.filter(
      cat => !enabledCategories.includes(cat)
    );

    if (missingCategories.length > 0) {
      setEnabledCategories(prev => [...prev, ...missingCategories]);
    }
  }, [allCategories, enabledCategories]);

  const filteredQuestions = questions.filter(q =>
    enabledCategories?.includes(q.category)
  );

  // --------------------
  // RANDOM LOGIC
  // --------------------
  const getRandomQuestion = () => {
    if (!filteredQuestions || filteredQuestions.length === 0) return null;
    if (filteredQuestions.length === 1) return filteredQuestions[0];

    let next;
    do {
      next = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
    } while (activeQuestion && next.question === activeQuestion.question);

    return next;
  };

  const nextQuestion = () => {
    setActiveQuestion(getRandomQuestion());
  };

  useEffect(() => {
    if (filteredQuestions.length > 0) {
      setActiveQuestion(getRandomQuestion());
    } else {
      setActiveQuestion(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabledCategories, questions]);

  // --------------------
  // RENDER
  // --------------------
  return (
    <div className={styles.app}>
      <div className={styles.wrapper}>
        {/* HEADER */}
        <header className={styles.header}>
          <img src={logo} alt="BigTalk logo" className={styles.logo} />
          <h1 className={styles.title}>Big Talk</h1>
        </header>

        {/* CONFIRMATION */}
        {showConfirmation && (
          <div className={styles.confirmation}>Frågan har lagts till!</div>
        )}

        {/* MAIN (visar rätt vy baserat på 'view') */}
        <main className={styles.main}>
          {view === 'main' && (
            <div className={styles.card}>
              <div className={styles.questionText}>
                {activeQuestion
                  ? activeQuestion.question
                  : 'Inga frågor matchar dina inställningar'}
              </div>
              <button className={styles.primaryBtn} onClick={nextQuestion}>
                Ny fråga
              </button>
            </div>
          )}

          {view === 'add' && (
            <AddQuestion
              onAdd={(q) => {
                setQuestions(prev => [...prev, q]);
                setShowConfirmation(true);
                setTimeout(() => {
                  setShowConfirmation(false);
                }, 1500);
              }}
            />
          )}

          {view === 'settings' && enabledCategories && (
            <Settings
              categories={allCategories}
              enabled={enabledCategories}
              setEnabled={setEnabledCategories}
            />
          )}
        </main>

        {/* FOOTER NAV (komponent med CSS Modules) */}
        <FooterNav view={view} setView={setView} />
      </div>
    </    </div>
  );
}

export default App;
