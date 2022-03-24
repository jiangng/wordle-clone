import React, { useState } from "react";
import Letter from "./Letter"
import GuessInput from "./GuessInput";
import { STATUS, WORD_LENGTH } from "./Wordle";

const Row = props => {

  const handleGuessInputChange = guess => {
    setGuess(guess)
  }

  const [guess, setGuess] = useState('')
  let letters = []

  switch (props.status) {
    case STATUS.submitted:
      letters = props.word.map(letter => {
        return (
          <Letter value={letter}></Letter>
        )
      })
      break
    case STATUS.remained:
    case STATUS.active:
      for (let x = 0; x < guess.length; x++) {
        letters.push((
          <Letter value={guess[x]}></Letter>
        ))
      }
      for (let x = 0; x < WORD_LENGTH - guess.length; x++) {
        letters.push((
          <Letter value=''></Letter>
        ))
      }    
      break  
  }

  return (
    <div class="grid">
      {props.status === STATUS.active &&
        <GuessInput
          guess={guess}
          onChange={handleGuessInputChange}
        ></GuessInput>
      }

      {letters}
    </div>
  )
}

export default Row