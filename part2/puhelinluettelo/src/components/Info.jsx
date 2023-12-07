import Person from './Person'

const Info = ({ persons, handleDelete }) => {
	return persons.map((human) => {
		return (
			<Person
				key={human.name}
				name={human.name}
				number={human.number}
				handleDelete={handleDelete}
			/>
		)
	})
}

export default Info
