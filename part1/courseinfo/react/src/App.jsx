const Header = (props) => {
  return (
  <>
  <h1>{props.coursename}</h1>
  </>
  )
}

const Content = (props) => {
  return (
  <>
  <p>
    <Part p={props.p1} e={props.e1}/>
  </p>
  <p>
    <Part p={props.p2} e={props.e2}/>
  </p>
  <p>
    <Part p={props.p3} e={props.e3}/>
  </p>
  </>
  )
}

const Part = (props) => {
  return (
    <>
    <p>
      {props.p} {props.e}
    </p>
    </>
  )

}
const Total = (props) => {
  return (
    <>
    <p>Number of exercises {props.e1+props.e2+props.e3}</p>
    </>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14


  return (
    <div>
      <Header coursename={course} />
      <Content p1={part1} p2={part2} p3={part3} e1={exercises1} e2={exercises2} e3={exercises3} />
      <Total e1={exercises1} e2={exercises2} e3={exercises3}/>
    </div>
  )
}

export default App