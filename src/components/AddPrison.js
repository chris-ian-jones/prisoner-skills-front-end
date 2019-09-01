import React, { useState, useEffect } from 'react'

import axiosWithAuth from './../utils/axiosWithAuth'

const AddPrison = props => {
  const [prisonInfo, newPrisonInfo] = useState(
    {
      name: '',
      address: ''
    }
  )
  const adminId = props.match.params.id
  // console.log(prisonInfo)

  const onChangeHandler = event => {
    newPrisonInfo({
      ...prisonInfo,
      [event.target.name]: event.target.value
    })
  }

  const onSubmitHandler = event => {
    event.preventDefault()
    const newPrison = {
      name: prisonInfo.name,
      address: prisonInfo.address,
      user_id: adminId
    }
    console.log(newPrison)
    axiosWithAuth()
      .post("https://prisoner-skills-cj.herokuapp.com/api/auth/prisons", newPrison)
      .then(result => console.log('axios post new prison result', result))
      .catch(error => console.log('axios post new prison error', error))
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <input name='name' value={prisonInfo.name} onChange={onChangeHandler} placeholder='Prison Name' />
      <input name='address' value={prisonInfo.address} onChange={onChangeHandler} placeholder='Prison Address' />
      <button onClick={{onSubmitHandler}}>Add Prison</button>
    </form>
  )
}

export default AddPrison