const Country = ({ name, handleShow }) => {
	return (
		<>
			<p>{name}</p>
			<button
				onClick={() => {
					handleShow(name)
				}}
			>
				Show
			</button>
		</>
	)
}

export default Country
