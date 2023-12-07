import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import NumbersDisplay from './components/NumberDisplay'
import PersonForm from './components/PersonForm'
import './index.css'
import * as contactService from './services/contactService'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newInfo, setNewInfo] = useState({ name: '', number: '' })
	const [search, setSearch] = useState('')
	const [notification, setNotification] = useState(null)

	//do not forget to turn server on!
	useEffect(() => {
		contactService.getContacts().then((contacts) => setPersons(contacts))
	}, [])

	const makeNotification = (message, color) => {
		setNotification({ color: color, message: message })
		setTimeout(() => {
			setNotification(null)
		}, 5000)
	}

	const handleDeleteUpdateError = (contact) => {
		setPersons(
			persons.filter((person) => {
				return person.id !== contact.id
			})
		)
		makeNotification(
			`Information of ${contact.name} has been already removed from server`,
			'red'
		)
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

				contactService
					.refreshData(updatedPerson)
					.then((data) => {
						const updatedPersons = persons.map((person) =>
							data.id !== person.id ? person : data
						)
						setPersons(updatedPersons)
						makeNotification(
							`Updated ${updatedPerson.name} successfully`,
							'green'
						)
					})
					.catch(() => {
						handleDeleteUpdateError(updatedPerson)
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
				makeNotification(`Added ${newContact.name}`, 'green')
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
					makeNotification(`Deleted ${toBeDeleted.name}`, 'red')
				})
				.catch(() => {
					handleDeleteUpdateError(updatedPerson)
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
