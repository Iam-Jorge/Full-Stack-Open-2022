import { useState } from 'react'

const generateRandom = (max) => {
  return Math.floor(Math.random() * max);
}

const Button = ({handleClick, text}) => {
  return <button onClick={handleClick}>{text}</button>
};

const AddVote = (selected, points) => {
  const pointsCopy = [...points];
  pointsCopy[selected] += 1;
  return (
    pointsCopy
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  return (
    <div>
      <div>
        <h2>Anecdote of the day</h2>
        <p>{anecdotes[selected]}</p>
        <p>Has {points[selected]} points</p>
        <Button handleClick={() => setPoints(AddVote(selected, points))} text="Vote"/>
        <Button handleClick={() => setSelected(generateRandom(anecdotes.length))} text="Next anecdote"/>
      </div>
      <div>
        <h2>Anecdote of the day</h2>
        <p>{anecdotes[points.indexOf(Math.max.apply(Math, points))]}</p>
        <p>{Math.max.apply(Math, points)}</p>
      </div>
    </div>
  )
}

export default App