import React, { useState, useEffect } from 'react'
import Axios from 'axios';

const Prisons = props => {
  const [prisonsData, getPrisonsData] = useState(null)
  console.log('prisonsData: ', prisonsData)

  useEffect(() => {
    Axios
      .get('https://prisoner-skills-cj.herokuapp.com/api/prisons')
      .then(result => {
        console.log('axios get prisons result: ', result)
        getPrisonsData(result.data)
      })
      .catch(error => {
        console.log('axios get prisons error: ', error)
      })
  }, [])

  return (
    <p>prisons placeholder</p>
  )
}

export default Prisons