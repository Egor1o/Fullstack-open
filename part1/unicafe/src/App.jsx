import { useState } from 'react'

const Button = ({ handleClick, text }) => {
	return (
		<>
			<button onClick={handleClick}>{text}</button>
		</>
	)
}

const positivePercentage = (positive, all) => {
	return all === 0 ? 0 : (positive / all) * 100
}

const average = (all) => {
	const length = all[0] + all[1] + all[2]
	return length === 0 ? 0 : (all[0] + -1 * all[2]) / length
}

const summary = (stats) => {
	let sum = 0
	stats.forEach((stat) => (sum = sum + stat))
	return sum
}

const StatisticLine = ({ text, value }) => {
	return (
		<>
			<tbody>
				<tr>
					<td>{text}</td>
					<td>{value}</td>
				</tr>
			</tbody>
		</>
	)
}

const Statistics = ({ stats }) => {
	const sum = summary(stats)
	return (
		<>
			<br></br>
			<h2>statistics</h2>
			<table>
				<StatisticLine value={stats[0]} text='good: ' />
				<StatisticLine value={stats[1]} text='neutral: ' />
				<StatisticLine value={stats[2]} text='bad: ' />
				<StatisticLine value={sum} text='all: ' />
				<StatisticLine value={average(stats)} text='average:  ' />
				<StatisticLine
					value={positivePercentage(stats[0], sum) + ' %'}
					text='positive:  '
				/>
			</table>
		</>
	)
}

const History = (props) => {
	if (summary(props.stats) == 0) {
		return (
			<div>
				<br></br>
				<p>No feedback given</p>
			</div>
		)
	}

	return <Statistics stats={props.stats} />
}

const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const addPositive = () => setGood(good + 1)
	const addNeutral = () => setNeutral(neutral + 1)
	const addBad = () => setBad(bad + 1)

	return (
		<div>
			<h2>give feedback </h2>
			<br></br>
			<Button handleClick={() => addPositive(good)} text='good' />
			<Button handleClick={addNeutral} text='neutral' />
			<Button handleClick={addBad} text='bad' />
			<History stats={[good, neutral, bad]} />
		</div>
	)
}

export default App
