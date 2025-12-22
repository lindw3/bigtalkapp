import { useState, useEffect, useRef, useMemo } from 'react';
import logo from './assets/bta_logotype.svg';
import styles from './App.module.css';
import defaultQuestions from './data/defaultQuestions';
import AddQuestion from './components/AddQuestion';
import Settings from './components/Settings';
import FooterNav from './components/FooterNav';
import InstallPrompt from './components/InstallPrompt';

function App() {
  // --------------------
  // QUESTIONS
  // --------------------
  const [questions, setQuestions] = useState(() => {
    const saved = localStorage.getItem('questions');
    if (!saved) return defaultQuestions;
    return JSON.parse(saved);
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
  const allCategories = useMemo(() => [...new Set(questions.map(q => q.category))], [questions]);
  const [enabledCategories, setEnabledCategories] = useState(() => {
    const saved = localStorage.getItem('enabledCategories');
    return saved ? JSON.parse(saved) : allCategories;
  });
  const prevCategoriesRef = useRef(allCategories);

  // --------------------
  // SEEN QUESTIONS
  // --------------------
  const [seenQuestionIds, setSeenQuestionIds] = useState(() => {
    const saved = localStorage.getItem('seenQuestionIds');
    return saved ? JSON.parse(saved) : [];
  });

  // --------------------
  // LOCALSTORAGE (debounced)
  // --------------------
  useEffect(() => {
    const id = setTimeout(() => {
      localStorage.setItem('questions', JSON.stringify(questions));
    }, 300);
    return () => clearTimeout(id);
  }, [questions]);

  useEffect(() => {
    const id = setTimeout(() => {
      localStorage.setItem('enabledCategories', JSON.stringify(enabledCategories));
    }, 300);
    return () => clearTimeout(id);
  }, [enabledCategories]);

  useEffect(() => {
    const id = setTimeout(() => {
      localStorage.setItem('seenQuestionIds', JSON.stringify(seenQuestionIds));
    }, 300);
    return () => clearTimeout(id);
  }, [seenQuestionIds]);

  // --------------------
  // SYNC NEW CATEGORIES
  // --------------------
  useEffect(() => {
    const prevCategories = prevCategoriesRef.current;
    const genuinelyNew = allCategories.filter(cat => !prevCategories.includes(cat));
    if (genuinelyNew.length > 0) {
      setEnabledCategories(prev => [...prev, ...genuinelyNew]);
    }
    prevCategoriesRef.current = allCategories;
  }, [allCategories]);

  // --------------------
  // FILTERED QUESTIONS (memoized)
  // --------------------
  const filteredQuestions = useMemo(() => 
    questions.filter(q => enabledCategories.includes(q.category)), 
    [questions, enabledCategories]
  );

  // --------------------
  // OWN QUESTIONS (memoized)
  // --------------------
  const ownQuestions = useMemo(() => 
    questions.filter(q => q.category === 'Egna frågor'), 
    [questions]
  );

  // --------------------
  // RANDOM QUESTION LOGIC
  // --------------------
  const getRandomQuestion = () => {
    if (filteredQuestions.length === 0) return null;

    let availableQuestions = filteredQuestions.filter(q => !seenQuestionIds.includes(q.id));
    if (availableQuestions.length === 0) {
      setSeenQuestionIds([]);
      availableQuestions = filteredQuestions;
    }

    let next;
    if (availableQuestions.length === 1) {
      next = availableQuestions[0];
    } else {
      do {
        next = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
      } while (activeQuestion && next.id === activeQuestion.id);
    }

    return next;
  };

  const nextQuestion = () => {
    if (animating) return;
    setAnimating(true);

    setTimeout(() => {
      const next = getRandomQuestion();
      setActiveQuestion(next);
      if (next) setSeenQuestionIds(prev => [...prev, next.id]);
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
  // DELETE OWN QUESTION
  // --------------------
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
        <header className={styles.header}>
          <img src={logo} alt="BigTalk logo" className={styles.logo} />
          <h1 className={styles.title}>BigTalk</h1>
          <h2 className={styles.subtitle}>App</h2>
        </header>

        <main className={styles.main} style={{ flex: 1 }}>
          {view === 'main' && (
            <div className={styles.card}>
              <div className={`${styles.questionText} ${animating ? styles['fade-slide-out'] : styles['fade-slide-in']}`}>
                {activeQuestion ? activeQuestion.question : 'Inga frågor matchar dina inställningar'}
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
              onAdd={(q) => setQuestions(prev => [...prev, q])}
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
        <InstallPrompt />
      </div>
    </div>
  );
}

export default App;
