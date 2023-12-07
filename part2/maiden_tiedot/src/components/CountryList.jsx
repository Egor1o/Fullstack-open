import Country from './Country'
const CountryList = ({ specific, country, handleSearch, handleShow }) => {
	if (specific !== '') {
		return null
	}
	const countries = handleSearch(country)
	if (countries.length > 10) {
		return (
			<>
				<p> Too many matches, specify another filter</p>
			</>
		)
	} else {
		return countries.map((country) => {
			return (
				<Country key={country} name={country} handleShow={handleShow} />
			)
		})
	}
}

export default CountryList
