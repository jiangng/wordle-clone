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
    setWords(words => {
      const list = words.slice()
      list.push(guess)
      return list
    })
  }

  const [words, setWords] = useState([])

  // Create rows for submitted words
  const rows = words.map((word, index) => {
    return (
      <Row 
        key={index}
        rowId={index}
        // word={word}
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
          key={words.length}
          rowId={words.length}
          // word={''}
          status={STATUS.active}
          onSubmit={handleSubmit}
        ></Row>
      ))
    } else {
      // Game over

    }
  }

  // Create empty rows for the remaining guesses
  for (let x = 0, init_row_length = rows.length; x < GUESS_COUNT - init_row_length; x ++) {
    rows.push((
      <Row 
        key={rows.length}
        rowId={rows.length}
        // word={''}
        status={STATUS.remained}
      ></Row>
    ))
  }

  return (
    <div id='board' className='container'>
      {rows}
    </div>
  )
}

export default Wordle