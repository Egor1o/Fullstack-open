import Info from './Info'
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
export default NumbersDisplay
