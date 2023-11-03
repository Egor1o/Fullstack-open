import axios from 'axios'
import { useEffect, useState } from 'react'

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

const Filter = ({ search, handleSearchChnage }) => {
	return (
		<>
			<h2>Phonebook</h2>
			<div>
				filter shown with
				<input value={search} onChange={handleSearchChnage} />
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
	const [serach, setSearch] = useState('')

	//do not forget to turn server on!
	useEffect(() => {
		axios.get('http://localhost:3002/persons').then((response) => {
			console.log(response.data)
			setPersons(response.data)
		})
	}, [])

	const handleAddClick = (event) => {
		event.preventDefault()
		if (persons.map((elem) => elem.name).includes(newInfo.name)) {
			alert(`${newInfo.name} is already added to phonebook`)
		} else {
			const copy = [...persons]
			const newObj = {
				name: newInfo.name,
				number: newInfo.number,
			}
			copy.push({ name: newInfo.name, number: newInfo.number })
			axios
				.post(`http://localhost:3002/persons`, newObj)
				.then((response) => {
					console.log(response)
					setPersons(copy)
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

	const handleSearchChnage = (event) => {
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
			<Filter search={serach} handleSearchChnage={handleSearchChnage} />
			<PersonForm
				handleAddClick={handleAddClick}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
				newInfo={newInfo}
			/>
			<NumbersDisplay
				persons={sortedSearch(persons, serach.toLowerCase())}
			/>
		</div>
	)
}

export default App
