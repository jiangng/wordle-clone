import React from "react";
import Letter from "./Letter"
import { GUESS_COUNT } from "./Wordle";

const Row = props => {
  const [currentWord, setCurrentWord] = useState('')

  const letters = props.letters.map(letter => {
    return (
      <Letter value={letter}></Letter>
    )
  })
  for (let x = 0; x < GUESS_COUNT - letters.length; x ++) {
    letters.concat((
      <Letter value={letter}></Letter>
    ))
  }

  return (
    <div class="grid">
      {letters}
    </div>
  )
}

export default Row