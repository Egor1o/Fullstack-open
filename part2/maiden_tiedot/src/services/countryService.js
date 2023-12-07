import axios from 'axios'

const getCountries = async () => {
	return axios
		.get('https://studies.cs.helsinki.fi/restcountries/api/all')
		.then((response) => {
			return response
		})
}

const getCountryInfo = async (name) => {
	return axios
		.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
		.then((response) => {
			return response
		})
}

const getWeather = async (json, key) => {
	const country = json
	const lat = country.capitalInfo.latlng[0]
	const lon = country.capitalInfo.latlng[1]

	const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`
	console.log(base)
	return axios.get(base).then((response) => {
		return response
	})
}

const getWeatherIcon = async (json) => {
	const base = `https://openweathermap.org/img/wn/${json.weather[0].icon}2x.png`
	return axios.get(base).then((response) => {
		return response
	})
}

export { getCountries, getCountryInfo, getWeather, getWeatherIcon }
