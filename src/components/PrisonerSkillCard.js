import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Card, Icon, Image } from 'semantic-ui-react'
import styled from 'styled-components'

import male from './../img/male.jpg'
import female from './../img/female.jpg'

const StyledContainer = styled.div`
  height: 75vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`

const PrisonerSkillCard = props => {
  const [prisonerData, setPrisonerData] = useState(null)
  const prisonerId = parseInt(props.match.params.id)
  console.log('prisonerData', prisonerData)
  
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
    <StyledContainer>
      {prisonerData ?
        <Card>
          {prisonerData.gender === "Male" ? 
            <Image src={male} wrapped ui={false} /> 
            : 
            <Image src={female} wrapped ui={false} />
          }
          <Card.Content>
            <Card.Header>{prisonerData.name}</Card.Header>
            <Card.Meta>
              <span>{prisonerData.gender}</span>
            </Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <a>
              <p>Can Have Work Leave: </p>
              {prisonerData.canHaveWorkLeave ? 
                <Icon name='check' /> 
                : 
                <Icon name='x' />
              }
            </a>
          </Card.Content>
          <Card.Content>
            <p>Skills:</p>
              {prisonerData.skills.map(skill => <p>{skill.name}</p>)}
          </Card.Content>
        </Card>
        :
        ''
      }
    </StyledContainer>
  )
}

export default PrisonerSkillCard