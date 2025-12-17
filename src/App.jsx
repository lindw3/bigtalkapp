import './App.css';
import { useState, useEffect } from 'react';
import logo from './assets/bta_logotype.svg';
import defaultQuestions from './data/defaultQuestions';
import AddQuestion from './components/AddQuestion';

function App() {
  // ---- DATA ----
  const [questions, setQuestions] = useState(() => {
    const saved = localStorage.getItem('questions');
    return saved ? JSON.parse(saved) : defaultQuestions;
  });

  const [activeQuestion, setActiveQuestion] = useState(null);
  const [view, setView] = useState('main'); // 'main' | 'add' | 'settings'

  // ---- PERSISTENCE ----
  useEffect(() => {
    localStorage.setItem('questions', JSON.stringify(questions));
  }, [questions]);

  // ---- RANDOM LOGIC ----
  const getRandomQuestion = () => {
    if (questions.length === 0) return null;
    if (questions.length === 1) return questions[0];

    let next;
    do {
      next = questions[Math.floor(Math.random() * questions.length)];
    } while (activeQuestion && next.question === activeQuestion.question);

    return next;
  };

  const nextQuestion = () => {
    setActiveQuestion(getRandomQuestion());
  };

  // Visa en fråga direkt när appen startar
  useEffect(() => {
    if (!activeQuestion && questions.length > 0) {
      setActiveQuestion(getRandomQuestion());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  // ---- RENDER ----
  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '2rem',
        fontFamily: 'system-ui',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* HEADER */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '2rem'
        }}
      >
        <img
          src={logo}
          alt="BigTalk logo"
          style={{ width: '80px', height: '80px' }}
        />
        <h1 style={{ margin: 0 }}>Big Talk</h1>
      </header>

      {/* MAIN CONTENT */}
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
                : 'Ingen fråga tillgänglig'}
            </div>

            <button onClick={nextQuestion} style={{ marginTop: '2rem' }}>
              Ny fråga
            </button>
          </div>
        )}

        {view === 'add' && (
          <AddQuestion
            onAdd={(q) => {
              setQuestions([...questions, q]);
              setView('main');
            }}
          />
        )}

        {view === 'settings' && (
          <div>
            <p>Inställningar kommer här</p>
          </div>
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
  );
}

export default App;
