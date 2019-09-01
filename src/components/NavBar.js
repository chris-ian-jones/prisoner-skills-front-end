import React from 'react'
import { Button, Menu } from 'semantic-ui-react'
import { Link } from "react-router-dom"
import styled from 'styled-components'

import logo from './../img/logo.png'

const StyledLogo = styled.img`
  height: 40px;
`

const Nav = () => (
  <Menu size='big'>
    <Menu.Item position='left'>
      <Link to="/">
        <StyledLogo src={logo} alt='Prisoner Skills logo'/>
      </Link>
    </Menu.Item>
    <Menu.Item position='right'>
      <Link to="/login">
        <Button>Login</Button>
      </Link>
    </Menu.Item>
    <Menu.Item >
      <Link to="/signup">
        <Button primary>Sign Up</Button>
      </Link>
    </Menu.Item>
  </Menu>
)

export default Nav