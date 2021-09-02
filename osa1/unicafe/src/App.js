import React, { useState } from 'react'
import Button from './components/Button'
import Header from './components/Header'
import Statistics from './components/Statistics'

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
      <Statistics otsikko="statistics" arvot={[good, neutral, bad]} tyhja="No feedback given" />
    </div>
  )
}

export default App