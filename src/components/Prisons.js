import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import styled from 'styled-components'
import Loader from 'react-loader-spinner';

import PrisonCard from './PrisonCard'
import { getPrisonData } from './../actions'

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
  console.log('prisonsData: ', props.prisonsData)

  useEffect(() => {
    props.getPrisonData()
  }, [])

  return (
    <StyledContainer>
      <h1>Prison List</h1>
      {props.isLoading ? (
        <Loader type="ThreeDots" color="#528dc9" height={40} width={100}/>
      ) : (
        <StyledCardContainer>
        {props.prisonsData ? 
          props.prisonsData.map(prison => (
            <Link to={`prison/${prison.id}`} key={prison.id}>
              <PrisonCard key={prison.id} name={prison.name} address={prison.address} />
            </Link>
          )) 
        : 
        null
        }
        </StyledCardContainer>
      )}
    </StyledContainer>
  )
}

const mapStateToProps = state => {
  return {
    prisonsData: state.prisons,
    isLoading: state.isLoading,
    error: state.error
  }
}

export default connect(
  mapStateToProps,
  {getPrisonData}
)(Prisons)