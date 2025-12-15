import React, { useState, useEffect } from 'react';
import Questions from './components/Questions';
import AddQuestion from './components/AddQuestion';
import defaultQuestions from './data/defaultQuestions';
import './App.css';

function App() {
  const [questions, setQuestions] = useState(() => {
    const saved = localStorage.getItem('questions');
    return saved ? JSON.parse(saved) : defaultQuestions;
  });

  useEffect(() => {
    localStorage.setItem('questions', JSON.stringify(questions));
  }, [questions]);

  const addQuestion = (q) => setQuestions([...questions, q]);
  const selectQuestion = (i) => alert(questions[i]);

  return (
    <div className="App" style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Big Talk</h1>
      <p>Klicka på en fråga för att se den i alert.</p>
      <Questions questions={questions} onSelect={selectQuestion} />
      <AddQuestion onAdd={addQuestion} />
    </div>
  );
}

export default App;
