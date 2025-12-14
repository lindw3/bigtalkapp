import { useState } from 'react'
import './App.css'

import { useLocalStorage } from './hooks/useLocalStorage'
import { defaultQuestions } from './data/defaultQuestions'


export default function App() {
const [questions, setQuestions] = useLocalStorage(
'questions',
defaultQuestions
)


function addQuestion(text) {
setQuestions([...questions, text])
}


return (
<main style={{ padding: '1rem', maxWidth: 600 }}>
<h1>Diskussionsfrågor</h1>


<ul>
{questions.map((q, i) => (
<li key={i}>{q}</li>
))}
</ul>


<form
onSubmit={e => {
e.preventDefault()
const input = e.target.elements.question
addQuestion(input.value)
input.value = ''
}}
>
<input
name="question"
placeholder="Lägg till egen fråga"
required
/>
<button>Lägg till</button>
</form>
</main>
)
}