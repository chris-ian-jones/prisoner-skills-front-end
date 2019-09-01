import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link } from "react-router-dom"
import styled from 'styled-components'

import PrisonCard from './PrisonCard'

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

const Prisons = props => {
  const [prisonsData, setPrisonsData] = useState(null)
  console.log('prisonsData: ', prisonsData)

  useEffect(() => {
    Axios
      .get('https://prisoner-skills-cj.herokuapp.com/api/prisons')
      .then(result => {
        console.log('axios get prisons result: ', result)
        setPrisonsData(result.data)
      })
      .catch(error => {
        console.log('axios get prisons error: ', error)
      })
  }, [])

  return (
    <StyledContainer>
      <h1>Prison List</h1>
      <StyledCardContainer>
        {prisonsData ? 
          prisonsData.map(prison => (
            <Link to={`prison/${prison.id}`} key={prison.id}>
              <PrisonCard key={prison.id} name={prison.name} address={prison.address} />
            </Link>
          )) 
        : 
        null
        }
      </StyledCardContainer>
    </StyledContainer>
  )
}

export default Prisons