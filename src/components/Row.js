import React from "react";
import Letter from "./Letter"
import { STATUS, GUESS_COUNT, WORD_LENGTH } from "./Wordle";

const Row = props => {
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
      for (let x = 0; x < WORD_LENGTH; x ++) {
        letters.push((
          <Letter value=''></Letter>
        ))
      }
      break
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
      {letters}
    </div>
  )
}

export default Row