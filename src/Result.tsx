import React from "react";

interface ResultProps {
	changeScreen: (params: any) => any;
	totalTime: number;
	totalWords: number;
	correctWords: number;
}

export default function Result({changeScreen, totalTime, totalWords, correctWords}: ResultProps) {
	const [wpm, setWPM] = React.useState(0);
	const [accuracy, setAccuracy] = React.useState(0);

	const calculateResults = () => {
		setWPM(Math.round( (correctWords / totalTime) * 60) );
		setAccuracy(Math.round( (correctWords / totalWords) * 100) );
	}

	React.useEffect(() => {
		calculateResults();
		console.log(wpm);
	})

	return (
		<div className="result">
			<h1 className="title">Results</h1>
			<p>Speed: {wpm}wpm</p>
			<p>Accuracy: {accuracy}%</p>
			<p>Average speed this session: {}</p>
			<p>Average accuracy this session: {}</p>
			<button onClick={() => changeScreen('playing')}>Play Again</button>
		</div>
	)
}
