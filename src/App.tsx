import React from 'react'
import './App.css'

const API_URL = "https://api.quotable.io/random"
const quoteDisplay = document.getElementById('quote-display')
const input = document.getElementById('input-display') as HTMLInputElement

function App() {
	const [quote, setQuote] = React.useState("")

	async function newQuote() {
		try {
			const response = await fetch(API_URL)
			if (!response.ok) throw new Error("Network response error")
			const data = await response.json()
			setQuote(data.content)
		} catch (error) {
			console.error("Error getting quote:", error)
			setQuote("Error")
		}
	}

	async function renderNewQuote() {
		console.log("Rendering new quote")
		newQuote()
		if (quoteDisplay) quoteDisplay.innerHTML = ""
		for (const c of quote) {
			const span = document.createElement('span')
			span.innerText = c
			if (quoteDisplay) quoteDisplay.append(span)
		}
		if (input) input.value = ""
	}

	function handleInput() {
		console.log("handling input")
		const userText = input.value.split("")
		const spanArray = quoteDisplay?.querySelectorAll('span')
		if (!spanArray) return null
		let i: number = 0
		let correct = true
		while (i < spanArray.length) {
			console.log("comparing chars")
			console.log(spanArray[i])
			if (userText[i] == null) {
				spanArray[i].classList.remove('correct')
				spanArray[i].classList.remove('incorrect')
				correct = false
			}
			else if (userText[i] === spanArray[i].innerText) {
				spanArray[i].classList.add('correct')
				spanArray[i].classList.remove('incorrect')
			} else {
				spanArray[i].classList.add('incorrect')
				spanArray[i].classList.remove('correct')
				correct = false
			}
			i++
		}
		
		if (correct) renderNewQuote()
	}

	React.useEffect(() => {
		renderNewQuote()
	}, [])

  return (
    <div className='container'>
			<p id='wpm'>WPM</p>
			<div id='quote-display'></div>
			<textarea id='input-display' placeholder='Type to begin' onChange={() => handleInput()}></textarea>
			<button onClick={renderNewQuote}>New Text</button>
    </div>
  )
}

export default App
