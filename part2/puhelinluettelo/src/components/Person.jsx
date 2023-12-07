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

export default Person
