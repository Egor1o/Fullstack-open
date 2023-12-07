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

export default Filter
