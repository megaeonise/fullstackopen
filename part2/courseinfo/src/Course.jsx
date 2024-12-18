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

export default Course