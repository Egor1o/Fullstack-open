import { useState } from 'react'

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

const NumbersDisplay = ({persons}) =>{
	return <><h2>Numbers</h2>
			<div>
				<Info persons={persons} />
			</div>
			</>
}

const Filter = ({search, handleSearchChnage}) =>{
	return <>
		<h2>Phonebook</h2>
			<div>
			filter shown with 
		<input value={search} onChange={handleSearchChnage}/>
		</div>
	</>
}

const PersonForm = ({handleAddClick, handleNameChange, handleNumberChange, newInfo}) => {
	return (<>
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
			</form></>)
}

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
		{ name: 'Dan Abramov', number: '12-43-234345' },
		{ name: 'Mary Poppendieck', number: '39-23-6423122' }
	])
	const [newInfo, setNewInfo] = useState({ name: '', number: '' })
	const [serach, setSearch] = useState('')

	const handleAddClick = (event) => {
		event.preventDefault()
		if (persons.map((elem) => elem.name).includes(newInfo.name)) {
			alert(`${newInfo} is already added to phonebook`)
		} else {
			const copy = [...persons]
			copy.push({ name: newInfo.name, number: newInfo.number })
			setPersons(copy)
			setNewInfo({name: '', number: ''})
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
		 return persons.filter(person => person.name.toLowerCase().startsWith(search))
		}
		else return persons
	}
	
	return (
		<div>
			<Filter search={serach} handleSearchChnage={handleSearchChnage}/>
			<PersonForm handleAddClick={handleAddClick} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newInfo={newInfo} />
			<NumbersDisplay persons={sortedSearch(persons,serach.toLowerCase())}/>
		</div>
	)
}

export default App
