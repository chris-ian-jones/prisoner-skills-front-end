import React, { useState, useEffect } from 'react'
import { Route } from "react-router-dom"

import NavBar from './components/NavBar'
import AdminNavBar from './components/AdminNavBar'
import SignUp from './components/SignUp'
import Login from './components/Login'

function App(props) {
  const [userToken, setUserToken] = useState('')
  
  useEffect(() => { 
    setUserToken(localStorage.getItem("token"))
  }, [userToken])

  return (
    <div className="App">
      { userToken ? <AdminNavBar setUserToken={setUserToken}/> : <NavBar /> }
      <Route exact path="/login" render={props => <Login {...props} setUserToken={setUserToken} />} />
      <Route exact path="/signup" component={SignUp} />
    </div>
  )
}

export default App
