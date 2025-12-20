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
    return saved ? JSON.parse(saved) : defaultQuestions;
  });

  // --------------------
  // UI STATE
  // --------------------
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [view, setView] = useState('main'); // 'main' | 'add' | 'settings'
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [btnPressed, setBtnPressed] = useState(false);       // Ny fråga-knappen

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
  // LOCALSTORAGE
  // --------------------
  useEffect(() => {
    localStorage.setItem('questions', JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem('enabledCategories', JSON.stringify(enabledCategories));
  }, [enabledCategories]);

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
  // FILTER QUESTIONS
  // --------------------
  const filteredQuestions = questions.filter(q => enabledCategories.includes(q.category));

  // --------------------
  // RANDOM QUESTION LOGIC
  // --------------------
  const getRandomQuestion = () => {
    if (filteredQuestions.length === 0) return null;
    if (filteredQuestions.length === 1) return filteredQuestions[0];

    let next;
    do {
      next = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
    } while (activeQuestion && next.question === activeQuestion.question);

    return next;
  };

  const nextQuestion = () => {
    if (animating) return; // Hindra spamming
    setAnimating(true);    // start fade-slide-out

    setTimeout(() => {
      setActiveQuestion(getRandomQuestion());
      setAnimating(false); // fade-slide-in
    }, 300); // matcha CSS-transition
  };

  const handleNextQuestion = () => {
    setBtnPressed(true);
    nextQuestion();
    setTimeout(() => setBtnPressed(false), 350); // återställ
  };

  // --------------------
  // INITIAL QUESTION (mount)
  // --------------------
  useEffect(() => {
    if (!activeQuestion && filteredQuestions.length > 0) {
      setActiveQuestion(getRandomQuestion());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --------------------
  // RENDER
  // --------------------
  return (
    <div className={styles.app}>
      <div className={styles.wrapper}>
        {/* HEADER */}
        <header className={styles.header}>
          <img src={logo} alt="BigTalk logo" className={styles.logo} />
          <h1 className={styles.title}>BigTalk</h1>
          <h2 className={styles.subtitle}>App</h2>
        </header>

        {/* CONFIRMATION */}
        {showConfirmation && (
          <div className={styles.confirmation}>
            Frågan har lagts till!
          </div>
        )}

        {/* MAIN */}
        <main className={styles.main}>
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
                  borderColor: '#000', // alltid svart
                }}
              >
                Ny fråga
              </button>
            </div>
          )}

          {view === 'add' && (
            <AddQuestion
            onAdd={q => {
              setQuestions(prev => [...prev, q]);
              setShowConfirmation(true);
              setTimeout(() => setShowConfirmation(false), 1500);
              }}/>
          )}

          {view === 'settings' && (
            <Settings
              categories={allCategories}
              enabled={enabledCategories}
              setEnabled={setEnabledCategories}
            />
          )}
        </main>

        {/* FOOTER */}
        <FooterNav view={view} setView={setView} />
      </div>
    </div>
  );
}

export default App;
