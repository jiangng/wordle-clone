import React, { useEffect, useState } from "react";
import Letter from "./Letter"
import { STATUS, WORD_LENGTH } from "./Wordle";

const Row = props => {
  const [guess, setGuess] = useState('')

  // Run after rendering completes
  useEffect(() => {
    const handleKeyDown = e => {    
      const handleEnterPressed = () => {
        let willSubmit = false
        let guess
    
        // Call setGuess to obtain the latest guess word
        setGuess(_guess => {
          if (_guess.length === WORD_LENGTH) {
            willSubmit = true
            guess = _guess
          } else {
            console.error('The guess word length is not 5.')
          }
    
          return _guess
        })
    
        if (willSubmit) props.onSubmit(guess)
      }

      //Regex for Valid Characters i.e. Alphabets.
      const regex = /^[A-Za-z]+$/;

      const keyCode = e.keyCode || e.which;
      if (regex.test(String.fromCharCode(keyCode))) {
        setGuess(guess => guess + e.key)
      } else if (e.key === 'Enter') {
        handleEnterPressed()
      } else if (e.key === 'Backspace') {
        setGuess(guess => guess.slice(0, -1))
      }
    }

    if (props.status === STATUS.active) {
      window.addEventListener('keydown', handleKeyDown)
    }
    
    // Cleanup runs during unmounting OR before running the effect i.e. cleaning up the previous effect
    return () => window.removeEventListener('keydown', handleKeyDown)
    
  }, [props.status])

  let letters = []
  for (let x = 0; x < guess.length; x++) {
    letters.push((
      <Letter key={x} value={guess[x]}></Letter>
    ))
  }
  for (let x = 0; x < WORD_LENGTH - guess.length; x++) {
    letters.push((
      <Letter key={guess.length + x} value=''></Letter>
    ))
  }   

  return (
    <div className="row">
      {letters}
    </div>
  )
}

export default Row