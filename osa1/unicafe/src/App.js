import React, { useState } from 'react'
import Button from './components/Button'
import Header from './components/Header'
import ResultLine from './components/ResultLine'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header teksti="give feedback" />
      <div>
        <Button kahva={() => setGood(good + 1)} teksti="good" />
        <Button kahva={() => setNeutral(neutral + 1)} teksti="neutral" />
        <Button kahva={() => setBad(bad + 1)} teksti="bad" />
      </div>
      <Header teksti="statistics" />
      <div>
        <ResultLine nimi="good" arvo={good} />
        <ResultLine nimi="neutral" arvo={neutral} />
        <ResultLine nimi="bad" arvo={bad} />
        <ResultLine nimi="all" arvo={good + neutral + bad} />
        <ResultLine nimi="average" arvo={((good - bad) / (good + neutral + bad)).toFixed(2)} />
        <ResultLine nimi="positive" arvo={(good * 100 / (good + neutral + bad)).toFixed(2)} />
      </div>
    </div>
  )
}

export default App