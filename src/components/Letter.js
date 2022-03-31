import React, { useEffect } from "react";

const Letter = props => {

  // const handleKeyDown = e => {
  //   const keyCode = e.keyCode || e.which;

  //   //Regex for Valid Characters i.e. Alphabets.
  //   const regex = /^[A-Za-z]+$/;

  //   if (regex.test(String.fromCharCode(keyCode))) {
  //     props.onKeyDown(e.key)
  //   }
  // }

  // useEffect(_ => {
  //   if (props.onKeyDown !== null)
  //     document.addEventListener('keypress', handleKeyDown)
  //   else
  //     document.removeEventListener('keydown', handleKeyDown)
  // }, [props.onKeyDown])

  return (
    <div className="col border border-dark">
      {props.value}
    </div>
  )
}

export default Letter