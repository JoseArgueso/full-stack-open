import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const MostVotedAnecdote = ({ anecdote }) => (
  <div>
    <h1>Anecdote with most votes</h1>
    {anecdote}
  </div>
)

const AnecdoteOfTheDay = ({ anecdote, points }) => (
  <div>
    <h1>Anecdote of the day</h1>
    {anecdote}<br></br>has {points} votes  
  </div>
)


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const setRandomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length)) 
  }

  const voteCurrentAnecdote = () => {
    const copy = [...points];
      copy[selected] += 1;
      setPoints(copy);
  }

  const getMostVotedAnecdote = () =>{
    const maxValue = Math.max(...points)
    return anecdotes[points.indexOf(maxValue)]
  }

  return (
    <div>
      <AnecdoteOfTheDay anecdote={anecdotes[selected]} points={points[selected]}></AnecdoteOfTheDay>
      <Button handleClick={setRandomAnecdote} text='next anecdote'></Button>
      <Button handleClick={voteCurrentAnecdote} text='vote'></Button>
      <MostVotedAnecdote anecdote={getMostVotedAnecdote()}></MostVotedAnecdote>
    </div>
  )
}

export default App