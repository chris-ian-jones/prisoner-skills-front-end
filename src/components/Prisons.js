import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link } from "react-router-dom"

import PrisonerCard from './PrisonerCard'

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
    <>
      <h1>Prison List</h1>
      {prisonsData ? 
        prisonsData.map(prison => (
          <Link to={`prison/${prison.id}`} key={prison.id}>
            <PrisonerCard key={prison.id} name={prison.name} address={prison.address} />
          </Link>
        )) 
      : 
      null
      }
    </>
  )
}

export default Prisons