import { useEffect, useState } from 'react'
import CountryList from './components/CountryList'
import InputForm from './components/InputForm'
import SpecificCountry from './components/SpecificCountry'
import * as countryService from './services/countryService'

function App() {
	const api_key = import.meta.env.VITE_SOME_KEY
	const [inputLine, setInputLine] = useState('')
	const [countries, setCountries] = useState(null)
	const [specificCountry, setSpecificCountry] = useState('')
	const [weather, setWeather] = useState('')

	const handleChange = (event) => {
		setWeather('')
		setSpecificCountry('')
		setInputLine(event.target.value)
	}

	const searchMatchingCountries = (match) => {
		return countries.filter((country) => {
			return country.includes(match)
		})
	}

	const handleShow = (name) => {
		countryService.getCountryInfo(name).then((response) => {
			setSpecificCountry(JSON.stringify(response.data))
		})
	}

	const handleWeather = () => {
		countryService
			.getWeather(JSON.parse(specificCountry), api_key)
			.then((response) => {
				setWeather(JSON.stringify(response.data))
			})
	}

	useEffect(() => {
		countryService.getCountries().then((response) => {
			setCountries(
				response.data.map((country) => {
					return country.name.common
				})
			)
		})
	}, [])

	if (!countries) {
		return null
	}

	return (
		<div>
			<InputForm value={inputLine} handleChange={handleChange} />
			<CountryList
				specific={specificCountry}
				country={inputLine}
				handleSearch={searchMatchingCountries}
				handleShow={handleShow}
			/>
			<SpecificCountry
				country_str={specificCountry}
				weather_str={weather}
				handleWeather={handleWeather}
			/>
		</div>
	)
}

export default App
