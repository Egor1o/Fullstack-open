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
			response.data
		})
}

export { getContacts, addContact }
