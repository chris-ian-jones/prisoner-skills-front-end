import React, { useState, useEffect } from 'react'
import { Route } from "react-router-dom"

import NavBar from './components/NavBar'
import AdminNavBar from './components/AdminNavBar'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Prisons from './components/Prisons'
import Prisoners from './components/Prisoners'
import PrisonerSkillCard from './components/PrisonerSkillCard'
import AdminDashboard from './components/AdminDashboard'
import AddPrisoner from './components/AddPrisoner'
import EditPrisoner from './components/EditPrisoner'

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

      <Route exact path="/" component={Prisons} />
      <Route exact path="/prison/:id" render={props => <Prisoners {...props} />} />
      <Route exact path="/prison/prisoner/:id" render={props => <PrisonerSkillCard {...props} />} />

      <Route exact path="/admin/prison/:id" component={AdminDashboard} />
      <Route exact path="/admin/prison/prisoner/:id" component={PrisonerSkillCard} />
      <Route exact path="/admin/prison/prisoner/:id/edit" component={EditPrisoner} />
      <Route exact path="/admin/prisoner/new" component={AddPrisoner} />
    </div>
  )
}

export default App