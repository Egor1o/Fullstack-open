import Weather from './Weather'
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

export default SpecificCountry
