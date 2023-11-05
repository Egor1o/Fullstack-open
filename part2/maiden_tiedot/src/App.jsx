import { useEffect, useState } from 'react'
import * as countryService from './services/countryService'

const InputForm = ({ value, handleChange }) => {
	return (
		<>
			<input value={value} onChange={handleChange} />
		</>
	)
}

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

const Weather = ({ weather, capital }) => {
	return (
		<>
			<h1>Weather in {capital} </h1>
			<p>Temperature is {weather.main.temp} Celsius</p>
			<img
				src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
			/>
			<p>wind {weather.wind.speed} m/s</p>
		</>
	)
}

const SpecificCountry = ({ country_str, weather_str, handleWeather }) => {
	if (country_str === '') {
		return null
	}
	if (weather_str == '') {
		handleWeather()
		return null
	}

	const weather = JSON.parse(weather_str)
	const country = JSON.parse(country_str)
	console.log(weather)
	const flagLink = Object.entries(country.flags)[0][1]
	return (
		<>
			<h1>{country.name.common}</h1>
			<p>capital {country.capital[0]}</p>
			<p>area {country.area}</p>
			<h3>languages:</h3>
			<ul>
				{Object.entries(country.languages).map(([key, value]) => (
					<li key={key}>
						{key}: {value}
					</li>
				))}
			</ul>
			<img src={flagLink} alt='flag' />
			<Weather weather={weather} capital={country.capital[0]} />
		</>
	)
}

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

function App() {
	const api_key = import.meta.env.SOME_KEY
	const [inputLine, setInputLine] = useState('')
	const [countries, setCountries] = useState(null)
	const [specificCountry, setSpecificCountry] = useState('')
	const [weather, setWeather] = useState('')
	const [icon, setIcon] = useState('')

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

	//when show nutton is pressed
	const handleShow = (name) => {
		countryService.getCountryInfo(name).then((response) => {
			setSpecificCountry(JSON.stringify(response.data))
		})
	}

	const handleWeather = () => {
		countryService
			.getWeather(JSON.parse(specificCountry))
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
		//<SpecificCountry country={specificCountry} />
	)
}

export default App
