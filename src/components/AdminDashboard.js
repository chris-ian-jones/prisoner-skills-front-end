import React, { useState, useEffect } from 'react'

import axiosWithAuth from './../utils/axiosWithAuth'
import AddPrison from './AddPrison'
import Prisoners from './Prisoners'

const AdminDashboard = props => {
  const [adminsPrisonData, setAdminsPrisonData] = useState(null)
  const adminId = props.match.params.id
  const [prisonName, setPrisonName] = useState('')

  console.log('adminId: ', adminId)
  console.log('adminsPrisonData', adminsPrisonData)
  console.log('prisonName', prisonName)

  useEffect(() => {
    axiosWithAuth()
      .get('https://prisoner-skills-cj.herokuapp.com/api/prisons')
      .then(result => {
        console.log('axios get prisons result: ', result.data)
        setAdminsPrisonData(result.data.filter(prison => prison.user_id === parseInt(adminId)))
      })
      .catch(error => {
        console.log('axios get prisons error: ', error)
      })
  }, [adminId, prisonName])

  return (
    <>
      <p>{prisonName}</p>
      {adminsPrisonData ? adminsPrisonData.length === 0 ? <AddPrison {...props} setPrisonName={setPrisonName} /> : <Prisoners {...props} /> : ''}
    </>
  )
}

export default AdminDashboard