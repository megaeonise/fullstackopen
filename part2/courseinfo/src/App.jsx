
const Course = ( {courses} ) => {
  const content = courses.map(course=>
    <div key={course.id}>
      <h2>{course.name}</h2>
      {course.parts.map(part => <p key={part.id}> <Part part={part}/></p>)}
      <Total sum={course.parts.reduce((sum, part) => sum + part.exercises, 0)}/>
    </div>
  )
  
  return (
    <>
    {content}
    </>
  )
}



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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <div>
    <h1>Web development curriculumn</h1>
    <Course courses={courses} />
    </div>
}

export default App