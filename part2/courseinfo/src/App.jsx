
const Course = ( {course} ) => {
  const parts = course.parts.map(part => 
    <p key={part.id}><Part part={part}/></p>
  )
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <>
    <Header course={course.name}/>
    {parts}
    <Total sum={total}/>
    </>
  )
}


const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <strong>total of {sum} exercises</strong>

const Part = ({ part }) => 
  <>
    {part.name} {part.exercises}
  </>

const Content = ({ parts }) => 
  <>
    <Part
      part={parts[0]} 
    />
    <Part
      part={parts[1]} 
    />
    <Part
      part={parts[2]} 
    />      
  </>

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App