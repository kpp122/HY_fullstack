
const App = () => {
  const course = {
    name : 'Half Stack application development',
    parts : [
      {
        name : 'Fundamentals of React',
        exercises : 10
      },
    
      {
        name : 'Using props to pass data',
        exercises : 7
      },
    
      {
        name : 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>   
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

const Header = ({name}) => {
  return(
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Content = ({parts}) => {

  return(
    <div>
      {parts.map(p => 
        <Part part={p.name} exercises={p.exercises} key={p.name}/>)
      }
    </div>
  )
}

const Part = ({part, exercises}) => {
  return(
    <div>
      <p>{part} {exercises}</p>
    </div>
  )
}

const Total = ({parts}) => {

  let sum = 0
  parts.forEach(p => {
    sum += p.exercises
  });

  return(
    <div>
      <p>Number of exercises {sum}</p>
    </div>
  )
}


export default App