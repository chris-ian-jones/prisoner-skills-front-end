import React, { useState, useEffect } from 'react'
import Axios from 'axios';

const PrisonerSkillCard = props => {
  const [prisonerData, setPrisonerData] = useState(null)
  const prisonerId = parseInt(props.match.params.id)
  console.log(prisonerData)
  
  useEffect(() => {
    Axios
      .get(`https://prisoner-skills-cj.herokuapp.com/api/prisoners/${prisonerId}/skills`)
      .then(result => {
        console.log('axios get skills result: ', result)
        setPrisonerData(result.data)
      })
      .catch(error => {
        console.log('axios get skills error: ', error)
      })
  }, [])

  return (
    <>
      {prisonerData ? 
        <div>
          <p>Name: {prisonerData.name}</p>
          <p>Gender: {prisonerData.gender}</p>
          <p>Can Have Work Leave: {prisonerData.canHaveWorkLeave ? 'Yes' : 'No'}</p>
          <p>Skills:</p>
          {prisonerData.skills.map(skill => <p>{skill.name}</p>)}
        </div>
      :
      ''
      }
    </>
  )
}

export default PrisonerSkillCard