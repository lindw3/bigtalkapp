import './App.css';
import { useState, useEffect } from 'react';
import defaultQuestions from './data/defaultQuestions';
import QuestionList from './components/QuestionList';
import AddQuestion from './components/AddQuestion';

function App() {
  const [questions, setQuestions] = useState(() => {
    const saved = localStorage.getItem('questions');
    return saved ? JSON.parse(saved) : defaultQuestions;
  });

  useEffect(() => {
    localStorage.setItem('questions', JSON.stringify(questions));
  }, [questions]);

  const addQuestion = (q) => setQuestions([...questions, q]);

  const selectQuestion = (i) => alert(questions[i].question);

  return (
    <div className="App" style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Big Talk</h1>
      <QuestionList questions={questions} onSelect={selectQuestion} />
      <AddQuestion onAdd={addQuestion} />
    </div>
  );
}

export default App;
