import React from 'react'

const PrisonerCard = props => {
  return (
    <>
      <p>Name: {props.name}</p>
      <p>Gender: {props.gender}</p>
      <p>Can Have Work Leave: {props.canHaveWorkLeave ? 'Yes' : 'No'}</p>
    </>
  )
}

export default PrisonerCard