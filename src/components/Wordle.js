import React, { useState } from 'react'
import Row from './Row'

export const GUESS_COUNT = 6
export const WORD_LENGTH = 5
export const STATUS = {
  active: 'active',
  submitted: 'submitted',
  remained: 'remained'
}
const WORD_OF_THE_DAY = 'react'

const Wordle = () => {

  const handleSubmit = guess => {
    const list = words.slice()
    list.push(guess)
    setWords(list)
  }

  const [words, setWords] = useState([])

  // Create rows for submitted words
  const rows = words.map(word => {
    return (
      <Row 
        word={word}
        status={STATUS.submitted}
      ></Row>
    )
  })

  if (words[words.length - 1] === WORD_OF_THE_DAY) {
    // Win
    
  } else {
    if (words.length < GUESS_COUNT) {
      // Proceed with the next guess
      rows.push((
        <Row
          word={''}
          status={STATUS.active}
          onSubmit={handleSubmit}
        ></Row>
      ))
    } else {
      // Game over

    }
  }

  // Create empty rows for the remaining guesses
  for (let x = 0; x < GUESS_COUNT - rows.length; x ++) {
    rows.push((
      <Row 
        word={''}
        status={STATUS.remained}
      ></Row>
    ))
  }

  return (
    <div id='board'>
      {rows}
    </div>
  )
}

export default Wordle