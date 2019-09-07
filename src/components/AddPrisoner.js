import React, {useState} from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import styled from 'styled-components'

import axiosWithAuth from './../utils/axiosWithAuth'
import history from './../utils/history'

const FormContainer = styled.div`
  height: 95vh;
  width: 100vw;
  background-color: #F7F7F7;
`

const AddPrisoner = () => {
  const [prisonerInfo, setPrisonerInfo] = useState(
    {
      name: '',
      gender: '',
      canHaveWorkLeave: '',
      skills: ''
    }
  )
  const [newSkill, setNewSkill] = useState('') 
  const [skills, setSkills] = useState([])
  const adminId = parseInt(localStorage.getItem("adminId"))

  const onChangeHandler = event => {
    setPrisonerInfo(
      {
        ...prisonerInfo,
        [event.target.name]: event.target.value
      }
    )
  }

  const newSkillChangeHandler = event => {
    setNewSkill(event.target.value)
  }

  const addNewSkillHandler = event => {
    event.preventDefault()

    setSkills([...skills, newSkill])
    setNewSkill('')
  }

  const onSubmitHandler = event => {
    event.preventDefault()
  
    const newPrisoner = {
      name: prisonerInfo.name,
      gender: prisonerInfo.gender,
      canHaveWorkLeave: prisonerInfo.canHaveWorkLeave,
      prison_id: adminId
    }

    axiosWithAuth()
      .post("https://prisoner-skills-cj.herokuapp.com/api/auth/prisoners", newPrisoner)
      .then(result => {
        console.log('axios create prisoner result: ', result)
        
        skills.forEach(skill => {
          const prisonerSkills = {
            name: skill,
            prisoner_id: result.data.id
          }
      
          axiosWithAuth()
            .post("https://prisoner-skills-cj.herokuapp.com/api/auth/skills", prisonerSkills)
            .then(result => {
              console.log('axios add prisoner skills result: ', result)
              history.push(`/admin/prison/${adminId}`)
            })
            .catch(error => {
              console.log('axios add prisoner skills error: ', error)
            })
        })
      })
      .catch(error => {
        console.log('axios create prisoner error: ', error)
      })
  }

  return (
    <FormContainer>
      <Form size='large'>
        <Grid textAlign='center' style={{ height: '70vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='blue' textAlign='center'>
              Add New Prisoner
            </Header>
            <Segment stacked>
              <Form.Field>
                <label>Name</label>
                <input name='name' value={prisonerInfo.name} onChange={onChangeHandler} placeholder='Name' />
              </Form.Field>
              <Form.Field>
                <label>Gender</label>
                <select name='gender' value={prisonerInfo.gender} onChange={onChangeHandler}>
                  <option value="Male" selected>Male</option>
                  <option value="Female">Female</option>
                </select>
              </Form.Field>
              <Form.Field>
                <label>Can Have Work Leave:</label>
                <select name='canHaveWorkLeave' value={prisonerInfo.canHaveWorkLeave} onChange={onChangeHandler}>
                  <option value="1" selected>Yes</option>
                  <option value="0">No</option>
                </select>
              </Form.Field>
              <Form.Field>
                <label>Skill:</label>
                <input name='skill' value={newSkill} onChange={newSkillChangeHandler} placeholder='Enter Skill' />
              </Form.Field>
              <Button type='submit' onClick={addNewSkillHandler}>Add Skill</Button>
              <div>
                {skills.length === 0 ? '' : <p>Skill list:</p>}
                {skills.map(skill => <p key={skill}>{skill}</p>)}
              </div>
              {skills.length === 0 ? '' : <Button type='submit' onClick={onSubmitHandler} >Save Prisoner</Button>}
            </Segment>
          </Grid.Column>
        </Grid>
      </Form>
    </FormContainer>
  )
}

export default AddPrisoner