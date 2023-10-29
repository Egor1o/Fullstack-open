import Content from './Content/Content'
import Header from './Content/Header'
import Total from './Content/Total'

const Course = (props) => {
	console.log(props)
	return props.courses.map((course) => {
		return (
			<>
				<Header course={course} />
				<Content course={course} />
				<Total course={course} />
			</>
		)
	})
}

export default Course
