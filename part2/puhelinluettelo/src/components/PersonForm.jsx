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

export default PersonForm
