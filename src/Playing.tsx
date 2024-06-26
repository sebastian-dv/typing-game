import React from "react"
import './App.css'

const API_URL = 'https://api.quotable.io/random'

export default function Playing(changeStatus: any) {
	const [quote, setQuote] = React.useState('')
	const [input, setInput] = React.useState('')

	const  newQuote = async () => {
		try {
			const response = await fetch(API_URL)
			if (!response.ok) throw new Error('Network response error')
			const data = await response.json()
			setQuote(data.content)
		} catch (error) {
			console.error('Error getting quote:', error)
			setQuote('Error')
		}
	}

	const handleInput = (event: any) => {
		const userInput: string = event.target.value
		if (!userInput.includes(' ')) {
			setInput(userInput)
		} else if (userInput !== '') {
			setInput('')
		}
	}

	React.useEffect(() => {
		console.log('Initializing quote')
		newQuote()
	}, [])

	return (
		<div className="playing">
			<h1 className="title">SpeedTyper</h1>
			<div className="quote">
				{
					quote.split('').map((value, index) =>
						<span key={index}>
							{value}
						</span>
					)
				}
			</div>
			<input className="input" value={input} onChange={handleInput} />
			<button onClick={newQuote}>New Text</button>
		</div>
	)
}
