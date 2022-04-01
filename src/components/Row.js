import React, { useEffect, useState } from "react";
import DICTIONARY from "../dictionary";
import Letter from "./Letter"
import { STATUS, WORD_LENGTH } from "./Wordle";

const Row = props => {
  const [guess, setGuess] = useState('')

  // Note: useEffect runs after rendering completes
  // Set up keydown event listener
  useEffect(() => {
    const handleKeyDown = e => {    
      
      const handleEnterPressed = () => {
        const checkGuess = guess => {
          if (guess.length !== WORD_LENGTH) {            
            console.error('The guess word length is not 5.')
            return false          
          } 
          
          if (!DICTIONARY.includes(guess)) {
            console.error('This word does not exist.')
            return false
          }
  
          return true
        } 

        // Call setGuess to obtain the latest guess word
        let guess
        setGuess(_guess => {
          guess = _guess
          return _guess
        })

        if (checkGuess(guess)) 
          props.onSubmit(guess)
      }

      //Regex for Valid Characters i.e. Alphabets.
      const regex = /^[A-Za-z]+$/;

      const keyCode = e.keyCode || e.which;
      if (regex.test(String.fromCharCode(keyCode))) {
        setGuess(guess => {
          if (guess.length === WORD_LENGTH)
            return guess
          return guess + e.key
        })
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
    <div className="row g-2">
      {letters}
    </div>
  )
}

export default Row