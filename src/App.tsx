import React from 'react'
import './App.css'
import Playing from './Playing'
import Result from './Result'


function App() {
	const [status, setStatus] = React.useState('playing')

	const handleChangeStatus = (status: string) => {
		setStatus(status)
	}

	let screen
	switch (status) {
		case 'result':
			screen = <Result />
			break
		default:
			screen = <Playing changeStatus={handleChangeStatus} />
	}

	return (
		<div className='app'>
			{ screen }
		</div>
	)
}

export default App
