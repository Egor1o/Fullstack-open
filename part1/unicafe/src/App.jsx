import { useState } from 'react'

const Button = ({ handleClick, text }) => {
	return (
		<>
			<button onClick={handleClick}>{text}</button>
		</>
	)
}

const positivePercentage = (positive, all) => {
	return all == 0 ? 0 : (positive / all) * 100
}

const average = (all) => {
	const length = all[0] + all[1] + all[2]
	return length == 0 ? 0 : (all[0] + -1 * all[2]) / length
}

const StatDisplay = ({ stats }) => {
	let sum = 0
	stats.forEach((stat) => (sum = sum + stat))
	return (
		<>
			<br></br>
			<h2>statistics</h2>
			<ul>
				<li>
					<p>good: {stats[0]}</p>
				</li>
				<li>
					<p>neutral: {stats[1]}</p>
				</li>
				<li>
					<p>bad: {stats[2]}</p>
				</li>
				<li>
					<p>all: {sum}</p>
				</li>
				<li>
					<p>average: {average(stats)}</p>
				</li>
				<li>
					<p>positive: {positivePercentage(stats[0], sum)} %</p>
				</li>
			</ul>
		</>
	)
}

const App = () => {
	// tallenna napit omaan tilaansa
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
			<StatDisplay stats={[good, neutral, bad]} />
		</div>
	)
}

export default App
