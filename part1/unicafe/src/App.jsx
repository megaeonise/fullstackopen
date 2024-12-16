import { useState } from 'react'

const Statistics = (props) => {
  if (props.good===0) {
    if (props.neutral===0){
      if (props.bad===0) {
        return (
          <p>
            No feedback given
          </p>
          )
      }
    }
  }
  return (
    <>
    <h1>statistics</h1>
    <table>
    <StatisticsLine text='good' value={props.good}/>
    <StatisticsLine text='neutral' value={props.neutral}/>
    <StatisticsLine text='bad' value={props.bad}/>
    <StatisticsLine text='all' value={props.good+props.neutral+props.bad}/>
    <StatisticsLine text='average' value={(props.good-props.bad)/(props.good+props.neutral+props.bad)}/>
    <StatisticsLine text='positive' value={(props.good/(props.good+props.neutral+props.bad))*100+'%'}/>
    </table>
    </>
  )
}

const StatisticsLine = (props) => {
  return (
    <tbody>
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
    </tbody>
  )
}

const Button = (props) => {
  return (
  <>
  <button onClick={props.feedback}>{props.name}</button>
  </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodFeedback = () => {
    setGood(good+1)
  }

  const neutralFeedback = () => {
    setNeutral(neutral+1)
  }

  const badFeedback = () => {
    setBad(bad+1)
  }
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button feedback={goodFeedback} name='good'/>
      <Button feedback={neutralFeedback} name='neutral'/>
      <Button feedback={badFeedback} name='bad'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App