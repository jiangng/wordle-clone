import React, { useState } from "react";
import Letter from "./Letter"
import GuessInput from "./GuessInput";
import { STATUS, WORD_LENGTH } from "./Wordle";

const Row = props => {

  const handleGuessInputChange = guess => {
    setGuess(guess)
  }

  const handleSubmit = _ => {
    if (guess.length !== WORD_LENGTH)
      console.error('The guess word length is not 5.')

    props.onSubmit(guess)
  }

  const [guess, setGuess] = useState('')
  let letters = []

  switch (props.status) {
    case STATUS.submitted:
      for (let x = 0; x < props.word.length; x++) {
        letters.push((
          <Letter value={props.word[x]}></Letter>
        ))
      }
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
          onSubmit={handleSubmit}
        ></GuessInput>
      }

      {letters}
    </div>
  )
}

export default Row