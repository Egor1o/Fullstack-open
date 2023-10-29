import { useState } from 'react'

const Person = ({ name }) => {
	return (
		<>
			<p>{name}</p>
		</>
	)
}

const Info = ({ persons }) => {
	console.log(persons)
	return persons.map((human) => {
		return <Person key={human.name} name={human.name} />
	})
}

const App = () => {
	const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
	const [newName, setNewName] = useState('')

	const handleAddClick = (event) => {
		event.preventDefault()
		const copy = [...persons]
		copy.push({ name: newName })
		setPersons(copy)
	}

	const handleInputChange = (event) => {
		setNewName(event.target.value)
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={handleAddClick}>
				<div>
					name: <input value={newName} onChange={handleInputChange} />
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<div>
				<Info persons={persons} />
			</div>
		</div>
	)
}

export default App
