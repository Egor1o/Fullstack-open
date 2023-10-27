const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

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


  const Content = (props) => {
    return (
      props.parts.map(part => {return <Part part={part}/>})
    )
  }

  const Total = (props) => {
    let sum = 0
    props.parts.forEach(elem => {sum = sum + elem.exercises})
    return (
      <>
      <p>Number of exercises {sum}</p>
      </>
    )
  }

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

export default App