import { queries } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import DICTIONARY from "../dictionary";
import Letter from "./Letter"
import { STATUS, WORD_LENGTH } from "./Wordle";

const COLOUR = {
  'CORRECT_SPOT': 'bg-success',
  'WRONG_SPOT': 'bg-warning',
  'NOT_IN_WORD': 'bg-secondary',
  'NOT_SUBMITTED': 'bg-light'
}

const Row = props => {
  const [guess, setGuess] = useState('')
  const [hints, setHints] = useState(Array(WORD_LENGTH).fill(COLOUR.NOT_SUBMITTED))

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

        const giveHints = guess => {
          // Make sure we register multiple same letters correctly
          const takenAnswerIndices = []
          const hints = Array(WORD_LENGTH).fill(COLOUR.NOT_IN_WORD)

          function checkEqual(char, answerIndex) {
            // e.g. guess: llama; answer: tiles
            // Without this condition, the second 'l' in 'llama' will be valid
            if (takenAnswerIndices.includes(answerIndex)) return false

            const guessIndex = this
            return guess[guessIndex] === char
          }

          const answer = props.answer.split('')

          // Check for green spots
          for (let i = 0; i < guess.length; i++) {
            if (guess[i] === answer[i]) {
              hints[i] = COLOUR.CORRECT_SPOT
              takenAnswerIndices.push(i)
            }
          }

          // Check for yellow spots
          for (let i = 0; i < guess.length; i++) {
            if (hints[i] === COLOUR.CORRECT_SPOT) continue 

            const answerIndex = answer.findIndex(checkEqual, i)
            if (answerIndex !== -1) {
              hints[i] = COLOUR.WRONG_SPOT
              takenAnswerIndices.push(answerIndex)
            }
          }

          setHints(hints)
        }

        // Call setGuess to obtain the latest guess word
        let guess
        setGuess(_guess => {
          guess = _guess
          return _guess
        })

        // if (true) {
        if (checkGuess(guess)) {
          giveHints(guess)
          props.onSubmit(guess)
        }
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
      <Letter key={x} value={guess[x]} colour={hints[x]}></Letter>
    ))
  }
  for (let x = 0; x < WORD_LENGTH - guess.length; x++) {
    letters.push((
      <Letter key={guess.length + x} value='' colour={hints[x]}></Letter>
    ))
  }   

  return (
    <div className="row g-2">
      {letters}
    </div>
  )
}

export default Row