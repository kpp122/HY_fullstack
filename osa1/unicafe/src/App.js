import { useState } from "react";

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick = () => setGood(good + 1)
  const neutralClick = () => setNeutral(neutral + 1)
  const badClick = () => setBad(bad + 1)


  return(
    <div>
      <h1>give feedback</h1>
      <Button handleClick={goodClick} text='good'/>
      <Button handleClick={neutralClick} text='neutral'/>
      <Button handleClick={badClick} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Statistics = ({good, neutral, bad}) => {
  let sum = good + neutral + bad
  let positive = sum === 0 ? 0 : good / sum

  if (sum > 0) {
    return(
      <table>
        <tbody>
          <StatisticLine statistic={good} text='good'/>
          <StatisticLine statistic={neutral} text='neutral'/>
          <StatisticLine statistic={bad} text='bad'/>
          <StatisticLine statistic={sum} text='all'/>
          <StatisticLine statistic={sum === 0 ? 0 : (good - bad) / sum} text='average'/>
          <StatisticLine statistic={positive.toString().concat('%')} text='positive'/>
        </tbody>
      </table>
    )
  }
  
  return(
    <p>No feedback given</p>
  )
}

const StatisticLine = ({statistic, text}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{statistic}</td>
    </tr>
  )
}

export default App;
