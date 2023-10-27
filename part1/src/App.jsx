const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }


  const Header = (props) => {
    console.log(props)
    return (
      <>
        <h1>{props.course}</h1>
      </>
    )
  }

  const Part = (props) => {
    return (
      <>
      <p>{props.part.name} {props.part.exercises}</p>
      </>
    )
  }


  const Content = () => {
    return (
      <>
      <Part part={part1} />
      <Part part={part2} />
      <Part part={part3} />
      </>
    )
  }

  const Total = () => {
    return (
      <>
      <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises}</p>
      </>
    )
  }

  return (
    <div>
      <Header course={course}/>
      <Content />
      <Total />
    </div>
  )
}

export default App