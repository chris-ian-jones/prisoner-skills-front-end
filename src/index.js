import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from "react-router"
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import { reducer } from './reducers'
import history from './utils/history'
import App from './App'

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>, 
  document.getElementById('root')
)

