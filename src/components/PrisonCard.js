import React from 'react'

const PrisonCard = props => {
  return (
    <>
      <p>Name: {props.name}</p>
      <p>Address: {props.address}</p>
    </>
  )
}

export default PrisonCard