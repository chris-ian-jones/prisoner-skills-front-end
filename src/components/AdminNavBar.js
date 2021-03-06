import React, { useState, useEffect } from 'react'
import { Menu, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { NavLink, Link } from 'react-router-dom'
import styled from 'styled-components'

import axiosWithAuth from './../utils/axiosWithAuth.js'
import history from './../utils/history'
import logo from './../img/logo.png'

const StyledLogo = styled.img`
  height: 40px;
`

const NavAdmin = props => {
  const [adminsPrisonData, setAdminsPrisonData] = useState(null)
  const adminId = localStorage.getItem('adminId')

  console.log('adminsPrisonData: ', adminsPrisonData)

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
  }, [adminId])

  const signOutHandler = event => {
    localStorage.clear();
    props.setUserToken('')
    history.push('/');
  }

  return (
    <Menu size='large'>
      <Menu.Item position='left'>
        <Link to="/">
          <StyledLogo src={logo} alt='Prisoner Skills logo'/>
        </Link>
      </Menu.Item>
      <Menu.Item  position='right'>
        <NavLink 
          to="/admin/prisoner/new" 
          activeClassName="selected" 
          activeStyle={{ color: "#05A6D2" }}
        >
          Add Prisoner
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink 
          to={`/admin/prison/${adminId}`}
          activeClassName="selected" 
          activeStyle={{ color: "#05A6D2" }}
        >
          Dashboard
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <Button onClick={signOutHandler}>Sign Out</Button>
      </Menu.Item>
    </Menu>
  )
}

export default NavAdmin