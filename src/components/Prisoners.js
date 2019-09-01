import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import styled from 'styled-components'

import PrisonerCard from './PrisonerCard'

const StyledContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`
const StyledCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: baseline;
  margin-top: 40px;
`

const Prisoners = props => {
  const [prisonersData, setPrisonersData] = useState(null)
  const prisonId = parseInt(props.match.params.id)

  useEffect(() => {
    Axios
      .get(`https://prisoner-skills-cj.herokuapp.com/api/prisoners`)
      .then(result => {
        const filteredPrisoners = result.data.filter(prisoner => prisoner.prison_id === prisonId)
        setPrisonersData(filteredPrisoners)
        console.log('filteredPrisoners', filteredPrisoners)
      })
      .catch(error => {
        console.log('axios get prisoners error: ', error)
      })
  }, [])

  return (
    <StyledContainer>
      <h1>Prisoners</h1>
      <StyledCardContainer>
        {prisonersData ?
          prisonersData.map(prisoner => (
            <PrisonerCard 
              key={prisoner.id} 
              id={prisoner.id} 
              name={prisoner.name} 
              gender={prisoner.gender} 
              canHaveWorkLeave={prisoner.canHaveWorkLeave} 
            />
          ))
          :
          null
        }
      </StyledCardContainer>
    </StyledContainer>
  )
}

export default Prisoners