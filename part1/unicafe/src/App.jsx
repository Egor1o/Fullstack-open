import { useState } from 'react'

const Button = ({ handleClick, text }) => {
	return (
		<>
			<button onClick={handleClick}>{text}</button>
		</>
	)
}

const StatDisplay = ({ stats }) => {
	return (
		<>
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
			<br></br>
			<h2>statistics</h2>
			<StatDisplay stats={[good, neutral, bad]} />
		</div>
	)
}

export default App
