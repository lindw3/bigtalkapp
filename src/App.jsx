import { useState, useEffect } from 'react';
import logo from './assets/bta_logotype.svg';
import defaultQuestions from './data/defaultQuestions';
import AddQuestion from './components/AddQuestion';
import Settings from './components/Settings';

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
      localStorage.setItem(
        'enabledCategories',
        JSON.stringify(enabledCategories)
      );
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
      next =
        filteredQuestions[
          Math.floor(Math.random() * filteredQuestions.length)
        ];
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
    <div
      style={{
        minHeight: '100vh',
        fontFamily: 'system-ui',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      {/* CONTENT WRAPPER */}
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* HEADER */}
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1rem'
          }}
        >
          <img
            src={logo}
            alt="BigTalk logo"
            style={{ width: '80px', height: '80px' }}
          />
          <h1 style={{ margin: 0 }}>Big Talk</h1>
        </header>

        {/* CONFIRMATION */}
        {showConfirmation && (
          <div
            style={{
              textAlign: 'center',
              marginBottom: '1rem',
              fontSize: '0.9rem',
              opacity: 1,
              transition: 'opacity 0.5s ease'
            }}
          >
            Frågan har lagts till!
          </div>
        )}

        {/* MAIN */}
        <main style={{ flex: 1 }}>
          {view === 'main' && (
            <div
              style={{
                border: '1px solid #000',
                borderRadius: '12px',
                padding: '2rem',
                minHeight: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div
                style={{
                  fontSize: '1.5rem',
                  textAlign: 'center'
                }}
              >
                {activeQuestion
                  ? activeQuestion.question
                  : 'Inga frågor matchar dina inställningar'}
              </div>

              <button onClick={nextQuestion} style={{ marginTop: '2rem' }}>
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

        {/* FOOTER NAV */}
        <footer
          style={{
            marginTop: '2rem',
            display: 'flex',
            justifyContent: 'space-around'
          }}
        >
          <button onClick={() => setView('main')}>🎲 Fråga</button>
          <button onClick={() => setView('add')}>➕ Lägg till fråga</button>
          <button onClick={() => setView('settings')}>⚙️ Inställningar</button>
        </footer>
      </div>
    </div>
  );
}

export default App;
