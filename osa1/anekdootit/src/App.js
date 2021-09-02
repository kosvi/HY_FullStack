import React, { useState } from 'react'
import Button from './components/Button'
import Header from './components/Header'
import Anecdote from './components/Anecdote'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const [votes, setVotes] = useState([
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ])

  const [selected, setSelected] = useState((Math.random() * (anecdotes.length - 1)).toFixed())
  const [winner, setWinner] = useState(-1)

  const satunnainen = () => {
    const seuraava = (Math.random() * (anecdotes.length - 1)).toFixed()
    setSelected(seuraava)
  }

  const aanesta = (id) => {
    return () => {
      const aanet = [...votes]
      aanet[id] = aanet[id] + 1
      setVotes(aanet)
      etsiSuosituin()
    }
  }

  const etsiSuosituin = () => {
    let suosituin = -1
    let eniten = -1
    for (let i = 0; i < votes.length; i++) {
      if (votes[i] > eniten) {
        suosituin = i
        eniten = votes[i]
      }
    }
    setWinner(suosituin)
  }

  return (
    <div>
      <Header teksti="Anecdote of the day" />
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button teksti="next anecdote" kahva={satunnainen} />
      <Button teksti="vote" kahva={aanesta(selected)} />
      <Header teksti="Anecdote with most votes" />
      <Anecdote anecdote={anecdotes[winner]} votes={votes[winner]} />
    </div>
  )
}

export default App