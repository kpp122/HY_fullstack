
const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(x =>
        <Part key={x.id} part={x} />
      )}
    </div>
  )
}

const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Total = ({ parts }) => {

  const total = parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0);

  return (
    <div>
      <h2>Total exercises {total}</h2>
    </div>
  )
}

export default Course