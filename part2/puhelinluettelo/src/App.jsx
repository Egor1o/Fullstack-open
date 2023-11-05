import { useEffect, useState } from 'react'
import './index.css'
import * as contactService from './services/contactService'

const Person = ({ name, number, handleDelete }) => {
	return (
		<>
			<p>
				{name} {number}
			</p>
			<button
				onClick={() => {
					handleDelete(name)
				}}
			>
				delete
			</button>
		</>
	)
}

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

const NumbersDisplay = ({ persons, handleDelete }) => {
	return (
		<>
			<h2>Numbers</h2>
			<div>
				<Info persons={persons} handleDelete={handleDelete} />
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

const Notification = ({ message }) => {
	if (message === null) {
		return null
	}

	return <div className='error'>{message}</div>
}

const App = () => {
	const [persons, setPersons] = useState([])
	const [newInfo, setNewInfo] = useState({ name: '', number: '' })
	const [search, setSearch] = useState('')
	const [notification, setNotification] = useState(null)

	//do not forget to turn server on!
	useEffect(() => {
		contactService.getContacts().then((contacts) => setPersons(contacts))
	}, [])

	const makeNotification = (message) => {
		setNotification(message)
		setTimeout(() => {
			setNotification(null)
		}, 5000)
	}

	const handleAddClick = (event) => {
		event.preventDefault()

		console.log(persons)
		const inListIndex = persons
			.map((elem) => {
				return elem.name
			})
			.indexOf(newInfo.name)
		console.log(inListIndex)

		if (inListIndex !== -1) {
			if (
				confirm(
					`${newInfo.name} is already in the list, do you want to update it ?`
				)
			) {
				const updatedPerson = {
					...persons[inListIndex],
					number: newInfo.number,
				}

				contactService.refreshData(updatedPerson).then((data) => {
					const updatedPersons = persons.map((person) =>
						data.id !== person.id ? person : data
					)
					setPersons(updatedPersons)
					makeNotification(
						`Updated ${updatedPerson.name} successfully`
					)
				})
			}
		} else {
			const newContact = {
				name: newInfo.name,
				number: newInfo.number,
			}
			contactService.addContact(newContact).then((data) => {
				setPersons([...persons].concat(data))
				setNewInfo({ name: '', number: '' })
				makeNotification(`Added ${newContact.name}`)
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

	const handleDelete = (name) => {
		if (confirm(`Delete ${name} ?`)) {
			const copy = persons.filter((person) => {
				return person.name !== name
			})
			const toBeDeleted = persons.filter(
				(person) => person.name === name
			)[0]
			contactService
				.deleteContact(toBeDeleted)
				.then(() => {
					setPersons(copy)
					makeNotification(`Deleted ${toBeDeleted.name}`)
				})
				.catch(() => {
					setPersons(
						persons.filter((person) => {
							return person.id !== toBeDeleted.id
						})
					)
					setNotification(
						`Information of ${toBeDeleted.name} has been already removed from server`
					)
				})
		}
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
			<Notification message={notification} />
			<PersonForm
				handleAddClick={handleAddClick}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
				newInfo={newInfo}
			/>
			<NumbersDisplay
				persons={sortedSearch(persons, search.toLowerCase())}
				handleDelete={handleDelete}
			/>
		</div>
	)
}

export default App
