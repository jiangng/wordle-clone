import React from "react";
import { WORD_LENGTH } from "./Wordle";

const GuessInput = props => {

  const handleChange = e => {
    //TODO: probably need to check for word length
    props.onChange(e.target.value)
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter' && props.guess.length === WORD_LENGTH) {
      props.onSubmit()
    }
  }

  return (
    <input
      type="text"
      value={props.guess}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      autoFocus
    ></input>
  )
}

export default GuessInput