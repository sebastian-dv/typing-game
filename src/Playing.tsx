import React from "react"
import './App.css'

const API_URL = 'https://api.quotable.io/random'

export default function Playing(changeStatus: any) {
	const [quote, setQuote] = React.useState<{value: string, status: boolean | null}[]>([]);
	const [input, setInput] = React.useState('');
	const [position, setPosition] = React.useState(0);

	const  newQuote = async () => {
		try {
			const response = await fetch(API_URL);
			if (!response.ok) throw new Error('Network response error');
			const data = await response.json();

			const dataArray = data.content.split(' ');
			let quoteArray: {value: string, status: boolean | null}[] = [];
			dataArray.forEach((element: string) => {
				quoteArray.push({
					value: element,
					status: null
				});
			});
			setQuote(quoteArray);
			setPosition(0);
		} catch (error) {
			console.error('Error getting quote:', error);
			setQuote([]);
		}
	}

	const handleInput = (event: any) => {
		let text: string = event.target.value;
		if (text.indexOf(' ') !== -1) {
			checkCorrect();
			setInput('');
			console.log('Current Position: ' + position);
			setPosition(position + 1);
			if (position + 1 >= quote.length) handleResult();
		} else {
			setInput(text)
		}
	}

	const checkCorrect = () => {
		const currentWord = quote[position];
		if (input === currentWord.value) {
			currentWord.status = true;
		} else {
			currentWord.status = false;
		}
	}

	const handleResult = () => {
		newQuote();
	}

	React.useEffect(() => {
		console.log('Initializing quote');
		newQuote();
	}, [])

	return (
		<div className="playing">
			<h1 className="title">SpeedTyper</h1>
			<ul className="quote">
				{
					quote.map((char, index) =>
						<li key={index} 
							className={
								char.status === true
								? 'correct'
								: char.status === false
								? 'incorrect'
								: ''
							}>
							{char.value}
						</li>
					)
				}
			</ul>
			<input className="input" value={input} onChange={handleInput}  />
			<button onClick={newQuote}>New Text</button>
		</div>
	)
}
