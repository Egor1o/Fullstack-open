import { useState } from 'react'

const Button = ({ handleClick, text }) => {
	return <button onClick={handleClick}>{text}</button>
}

const Anecdote = ({ anecdote, text }) => {
	return (
		<>	<h1>{text}</h1>
			<div>{anecdote}</div>
		</>
	)
}


const App = () => {
	const anecdotes = [
		'If it hurts, do it more often.',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
		'The only way to go fast, is to go well.',
	]

	const [selected, setSelected] = useState(0)
	const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

	const chooseAnecdote = () =>
		setSelected(Math.floor(Math.random() * anecdotes.length))

	const giveVote = () => {
		const pointsCopy = [...points]
		pointsCopy[selected] += 1
		console.log(pointsCopy)
		setPoints(pointsCopy)
		// next line is added so that user can't vote multiple time the same anecdote right away
		chooseAnecdote()
	}

	const getBest = () => {
		// more efficient compare techniques could have been used 
		let index = 0
		let count = 0
		points.forEach(point => {
			if (points[index] < point) {
				index = count
			}
			count+=1
		})
		return anecdotes[index]
	}


	return (
		<div>
			<Anecdote anecdote={anecdotes[selected]} text='Anecdote of the day' />
			<Button handleClick={giveVote} text='vote' />
			<Button handleClick={chooseAnecdote} text='next anecdote' />
			<Anecdote anecdote={getBest()} text='Anecdote with most votes' />
		</div>
	)
}

export default App
