import Part from './Part'

const Content = (props) => {
	return props.course.parts.map((part, id) => {
		return <Part key={id} part={part} />
	})
}

export default Content
