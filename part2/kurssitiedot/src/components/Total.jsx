const Total = (props) => {
	let sum = props.course.parts.reduce((s, p) => s + p.exercises, 0)
	return (
		<>
			<h4>total of {sum} exercises</h4>
		</>
	)
}

export default Total
