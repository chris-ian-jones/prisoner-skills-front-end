import React, { useState, useEffect } from 'react'
import Axios from 'axios';

import PrisonerCard from './PrisonerCard'

const Prisoners = props => {
  const [prisonersData, setPrisonersData] = useState(null)
  const prisonId = parseInt(props.match.params.id)

  // console.log('prisonId', prisonId)

  useEffect(() => {
    Axios
      .get(`https://prisoner-skills-cj.herokuapp.com/api/prisoners`)
      .then(result => {
        console.log('axios get prisoners result: ', result.data)
        // result.data.map(prisoner => {
        //   console.log(prisoner.prison_id)
        // })

        const filteredPrisoners = result.data.filter(prisoner => prisoner.prison_id === prisonId)
        setPrisonersData(filteredPrisoners)
        console.log('filteredPrisoners', filteredPrisoners)
      })
      .catch(error => {
        console.log('axios get prisoners error: ', error)
      })
  }, [])

  return (
    <>
    {prisonersData ?
      prisonersData.map(prisoner => (
        <PrisonerCard key={prisoner.id} name={prisoner.name} gender={prisoner.gender} canHaveWorkLeave={prisoner.canHaveWorkLeave} />
      ))
      :
      null
    }
    </>
  )
}

export default Prisoners