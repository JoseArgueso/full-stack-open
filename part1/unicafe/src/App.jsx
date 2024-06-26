import { useState } from 'react'

const StatisticsLine = ({text, value}) => {
  return (
    <p>{text} {value}</p>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({props}) => {
  const {good, neutral, bad, all, average, positivePercent} = props
  if(all===0){
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  else{
    return (
      <div>
      <StatisticsLine text ='good' value={good}></StatisticsLine>
      <StatisticsLine text ='neutral' value={neutral}></StatisticsLine>
      <StatisticsLine text ='bad' value={bad}></StatisticsLine>
      <StatisticsLine text ='all' value={all}></StatisticsLine>
      <StatisticsLine text ='average' value={average}></StatisticsLine>
      <StatisticsLine text ='positive' value={positivePercent + ' %'}></StatisticsLine>
    </div>
    )
  }
}

const App = (props) => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () =>setGood(good + 1)
  const increaseNeutral = () =>setNeutral(neutral + 1)
  const increaseBad = () =>setBad(bad + 1)

  const getAll = () => {return good + neutral + bad}
  const getPositivePercent = () => {
    if (getAll() === 0){
      return 0
    }
    return ((good / getAll()) * 100) 
  }
  const getAverage = () => {
    if (getAll() ===0){
      return 0
    }
    else{
      return ((good - bad) / getAll())
    }
  }

  const getStatistics = () => {
    return {
      good:good,
      neutral:neutral, 
      bad:bad, 
      all:getAll(), 
      average:getAverage(), 
      positivePercent:getPositivePercent()     
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={increaseGood} text='good'/>
        <Button handleClick={increaseNeutral} text='neutral'/>
        <Button handleClick={increaseBad} text='bad'/>
      </div>
      <h1>statistics</h1>
     <Statistics props={getStatistics()}/>
    </div>
  )
}

export default App