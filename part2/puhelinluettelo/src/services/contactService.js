import axios from 'axios'

const getContacts = async () => {
	return axios
		.get('http://localhost:3002/persons')
		.then((response) => response.data)
}

const addContact = async (newContact) => {
	return axios
		.post(`http://localhost:3002/persons`, newContact)
		.then((response) => {
			return response.data
		})
}

const deleteContact = async (contact) => {
	return axios
		.delete(`http://localhost:3002/persons/${contact.id}`)
		.then((response) => {
			response.data
		})
}

const refreshData = async (person) => {
	return axios
		.put(`http://localhost:3002/persons/${person.id}`, person)
		.then((response) => {
			return response.data
		})
}

export { getContacts, addContact, deleteContact, refreshData }
