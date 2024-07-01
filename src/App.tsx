import React from 'react'
import './App.css'
import Playing from './Playing'
import Result from './Result'


function App() {
	const [screen, setScreen] = React.useState<any>(null);

	const showResultScreen = (totalTime: number, totalWords: number, correctWords: number) => {
		setScreen(<Result changeScreen={showPlayingScreen} totalTime={totalTime} totalWords={totalWords} correctWords={correctWords} />);
	}

	const showPlayingScreen = () => {
		setScreen(<Playing changeScreen={showResultScreen} />);
	}

	React.useEffect(() => {
		showPlayingScreen();
	}, []);

	return (
		<div className='app'>
			{ screen }
		</div>
	)
}

export default App
