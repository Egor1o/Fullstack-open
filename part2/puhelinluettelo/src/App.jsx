import { useEffect, useState } from 'react'
import * as contactService from './services/contactService'

const Person = ({ name, number }) => {
	return (
		<>
			<p>
				{name} {number}
			</p>
		</>
	)
}

const Info = ({ persons }) => {
	return persons.map((human) => {
		return (
			<Person key={human.name} name={human.name} number={human.number} />
		)
	})
}

const NumbersDisplay = ({ persons }) => {
	return (
		<>
			<h2>Numbers</h2>
			<div>
				<Info persons={persons} />
			</div>
		</>
	)
}

const Filter = ({ search, handleSearchChange }) => {
	return (
		<>
			<h2>Phonebook</h2>
			<div>
				filter shown with
				<input value={search} onChange={handleSearchChange} />
			</div>
		</>
	)
}

const PersonForm = ({
	handleAddClick,
	handleNameChange,
	handleNumberChange,
	newInfo,
}) => {
	return (
		<>
			<h2>Add a new</h2>
			<form onSubmit={handleAddClick}>
				<div>
					name:
					<input value={newInfo.name} onChange={handleNameChange} />
				</div>
				<div>
					number:
					<input
						value={newInfo.number}
						onChange={handleNumberChange}
					/>
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
		</>
	)
}

const App = () => {
	const [persons, setPersons] = useState([])
	const [newInfo, setNewInfo] = useState({ name: '', number: '' })
	const [search, setSearch] = useState('')

	//do not forget to turn server on!
	useEffect(() => {
		contactService.getContacts().then((contacts) => setPersons(contacts))
	}, [])

	const handleAddClick = (event) => {
		event.preventDefault()
		if (persons.map((elem) => elem.name).includes(newInfo.name)) {
			alert(`${newInfo.name} is already added to phonebook`)
		} else {
			const copy = [...persons]
			const newContact = {
				name: newInfo.name,
				number: newInfo.number,
			}
			contactService.addContact(newContact).then(() => {
				setPersons(copy.concat(newContact))
				setNewInfo({ name: '', number: '' })
			})
		}
	}

	const handleNameChange = (event) => {
		setNewInfo({ ...newInfo, name: event.target.value })
	}

	const handleNumberChange = (event) => {
		setNewInfo({ ...newInfo, number: event.target.value })
	}

	const handleSearchChange = (event) => {
		setSearch(event.target.value)
	}

	const sortedSearch = (persons, search) => {
		if (search !== '') {
			return persons.filter((person) =>
				person.name.toLowerCase().startsWith(search)
			)
		} else return persons
	}

	return (
		<div>
			<Filter search={search} handleSearchChange={handleSearchChange} />
			<PersonForm
				handleAddClick={handleAddClick}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
				newInfo={newInfo}
			/>
			<NumbersDisplay
				persons={sortedSearch(persons, search.toLowerCase())}
			/>
		</div>
	)
}

export default App
