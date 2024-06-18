import { useState } from 'react'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () =>setGood(good + 1)
  const increaseNeutral = () =>setNeutral(neutral + 1)
  const increaseBad = () =>setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <button onClick={increaseGood}>
          good
        </button>
        <button onClick={increaseNeutral}>
          neutral
        </button>
        <button onClick={increaseBad}>
          bad
        </button>
      </div>
      <h1>statistics</h1>
      <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
      </div>
    </div>
  )
}

export default App