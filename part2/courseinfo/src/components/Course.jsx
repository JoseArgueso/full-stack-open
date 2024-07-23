const Part = ({part}) => {
    return (
      <div>{part.name} {part.exercises}</div>
    )
  }
  
  const Course = ({course}) =>{
    const totalExercises = course.parts.reduce(
      (accumulator, currentValue) => 
        accumulator + currentValue.exercises,0
    );
  
    return (
      <div>
        <h2>{course.name}</h2>
          {course.parts.map(part => <Part key={part.id} part={part} />)}
        <h4>total of {totalExercises} exercises</h4>
      </div>
    )
  }

  export default Course