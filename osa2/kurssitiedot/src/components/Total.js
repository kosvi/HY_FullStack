import React from 'react'

const Total = ({ parts }) => {
  const total = parts.map(part => part.exercises).reduce((a, b) => a + b)
  return (
    <p>
      <b>Number of exercises {total}</b>
    </p>
  )
}

export default Total
