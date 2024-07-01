import React from "react"
import './App.css'

const API_URL = 'https://api.quotable.io/random'

interface PlayingProps {
	changeScreen: (totalTime: number, totalWords: number, correctWords: number) => any;
}

export default function Playing({changeScreen}: PlayingProps) {
	const [quote, setQuote] = React.useState<{value: string, status: boolean | null}[]>([]);
	const [input, setInput] = React.useState('');
	const [position, setPosition] = React.useState(0);
	const [startTime, setStartTime] = React.useState<Date | null>(null);

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
			setInput('');
			setStartTime(null);
		} catch (error) {
			console.error('Error getting quote:', error);
			setQuote([]);
		}
	}

	const handleInput = (event: any) => {
		if (startTime === null) {
			setStartTime(new Date());
		}
		let text: string = event.target.value;
		if (text.indexOf(' ') !== -1) {
			checkCorrect(text);
			setInput('');
			setPosition(position + 1);
		} else {
			setInput(text)
			if (position === quote.length - 1) checkCorrect(text);
		}
	}

	const checkCorrect = (currentInput: string) => {
		const currentWord = quote[position];
		if (position === quote.length - 1) {
			if (currentInput === currentWord.value) {
				currentWord.status = true;
				handleResult();
			}
			if (currentInput.indexOf(' ') !== -1) {
				currentWord.status = false;
				handleResult();
			}
		} else {
			if (position + 1 >= quote.length) handleResult();
			if (input === currentWord.value) {
				currentWord.status = true;
			} else {
				currentWord.status = false;
			}
		}
	}

	const handleResult = () => {
		if (startTime !== null) {
			let totalTimeSeconds = (Date.now() - startTime.valueOf()) / 1000;
			console.log('Total Time: ' + totalTimeSeconds + ' seconds');
			let correctWords = 0;
			for (var word of quote) {
				if (word.status === true) {
					correctWords++;
				}
			}
			console.log('Correct Words: ' + correctWords);
			setTimeout(() => {
				changeScreen(totalTimeSeconds, quote.length, correctWords);
			}, 300);
		} else {
			console.log('Null startTime');
		}
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
			<input className="input" value={input} onChange={handleInput} autoFocus={true} />
			<button onClick={newQuote}>New Text</button>
		</div>
	)
}
