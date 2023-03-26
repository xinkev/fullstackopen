import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({ text, value }) => <div>{text} {value}</div>

const Statistics = ({ good, neutral, bad }) => {
  if (!good && !neutral && !bad) {
    return <p>No feedback given</p>
  }

  const calculateAverage = () => {
    const numOfRatings = good + neutral + bad
    if (numOfRatings === 0) return 0
    const totalScore = (good * 1) + (neutral * 0) + (bad * -1)
    return totalScore * 1.0 / numOfRatings
  }

  const calculateGoodPercentage = () => {
    const total = good + neutral + bad
    if (total === 0) return 0
    return (good / total * 1.0) * 100
  }

  return <>
    <StatisticLine text="good" value={good}/>
    <StatisticLine text="neutral" value={neutral}/>
    <StatisticLine text="bad" value={bad}/>
    <StatisticLine text="average" value={calculateAverage()}/>
    <StatisticLine text="positive" value={calculateGoodPercentage()}/>
  </>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text={"give feedback"} />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header text={"statistics"} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App