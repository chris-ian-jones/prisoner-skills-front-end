import React, {useState} from 'react'

import axiosWithAuth from './../utils/axiosWithAuth'
import history from './../utils/history'

const AddPrisoner = () => {
  const [prisonerInfo, setPrisonerInfo] = useState(
    {
      name: '',
      gender: 'Male',
      canHaveWorkLeave: 'Yes',
      skills: ''
    }
  )
  const adminId = parseInt(localStorage.getItem("adminId"))

  const onChangeHandler = event => {
    setPrisonerInfo(
      {
        ...prisonerInfo,
        [event.target.name]: event.target.value
      }
    )
  }

  const onSubmitHandler = event => {
    event.preventDefault()
    console.log(prisonerInfo)
    
    const newPrisoner = {
      name: prisonerInfo.name,
      gender: prisonerInfo.gender,
      canHaveWorkLeave: prisonerInfo.canHaveWorkLeave,
      prison_id: adminId
    }

    console.log(newPrisoner)

    axiosWithAuth()
      .post("https://prisoner-skills-cj.herokuapp.com/api/auth/prisoners", newPrisoner)
      .then(result => {
        console.log('axios create prisoner result: ', result)
        
        const prisonerSkills = {
          name: prisonerInfo.skills,
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
      .catch(error => {
        console.log('axios create prisoner error: ', error)
      })
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <input name='name' value={prisonerInfo.name} onChange={onChangeHandler} placeholder='Name' />
      <p><strong>Select Gender:</strong></p>
      <select name='gender' value={prisonerInfo.gender} onChange={onChangeHandler}>
          <option value="Male" selected>Male</option>
          <option value="Female">Female</option>
      </select>
      <p><strong>Can Have Work Leave:</strong></p>
      <select name='canHaveWorkLeave' value={prisonerInfo.canHaveWorkLeave} onChange={onChangeHandler}>
          <option value="1" selected>Yes</option>
          <option value="0">No</option>
      </select>
      <input name='skills' value={prisonerInfo.skills} onChange={onChangeHandler} placeholder='Skills' />
      <button>Add Prisoner</button>
    </form>
  )
}

export default AddPrisoner