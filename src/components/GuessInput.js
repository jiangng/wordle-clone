import React from "react";

const GuessInput = props => {

  const handleChange = e => {
    //TODO: probably need to check for word length
    props.onGuessInputChange(e.target.value)
  }

  return (
    <input
      type="text"
      value={props.guess}
      onChange={handleChange}
      autoFocus
    ></input>
  )
}

export default GuessInput