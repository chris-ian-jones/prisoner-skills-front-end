import React from 'react'
import { Link } from "react-router-dom"

const PrisonerCard = props => {
  return (
    <>
      <p>Name: {props.name}</p>
      <p>Gender: {props.gender}</p>
      <p>Can Have Work Leave: {props.canHaveWorkLeave ? 'Yes' : 'No'}</p>
      <Link to={`prisoner/${props.id}`}>
        <button>Skills</button>
      </Link>
    </>
  )
}

export default PrisonerCard