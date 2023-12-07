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

export default Weather
