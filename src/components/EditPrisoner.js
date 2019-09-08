import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Card, Icon, Image } from 'semantic-ui-react'
import styled from 'styled-components'

import male from './../img/male.jpg'
import female from './../img/female.jpg'
import axiosWithAuth from '../utils/axiosWithAuth'
import history from '../utils/history'

const StyledContainer = styled.div`
  height: 75vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`
const SkillContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const EditPrisoner = props => {
  const [prisonerData, setPrisonerData] = useState(null)
  const prisonerId = parseInt(props.match.params.id)
  const prisonId = localStorage.getItem("adminId")
  {prisonerData ? console.log('prisoner skills: ', prisonerData.skills) : console.log('prisoner skills: ', '')}

  console.log('prisonerdata: ', prisonerData)

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

  const skillDeleteHandler = event => {
    const skillId = event.target.id
    axiosWithAuth()
      .delete(`https://prisoner-skills-cj.herokuapp.com/api/auth/skills/${skillId}`)
      .then(result => {
        console.log('axios delete skills result: ', result)
        setPrisonerData({
          ...prisonerData,
          skills: prisonerData.skills.filter(skill => skill.id != skillId)
        })
      })
      .catch(error => {
        console.log('axios delete skills error: ',error)
      })
  }

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
              {prisonerData.skills.map(skill =>
                <SkillContainer>
                  <p>{skill.name}</p>
                  <div onClick={skillDeleteHandler} id={skill.id}>X</div>
                </SkillContainer>
              )}
              
          </Card.Content>
          <button>Update</button>
        </Card>
      :
      ''
    }
    </StyledContainer>
  )
}

export default EditPrisoner