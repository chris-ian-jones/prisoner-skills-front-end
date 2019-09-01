import React from 'react'

const PrisonerCard = props => {
  return (
    <>
      <p>Name: {props.name}</p>
      <p>Address: {props.address}</p>
    </>
  )
}

export default PrisonerCard