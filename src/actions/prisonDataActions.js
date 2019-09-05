import axios from 'axios'

export const FETCH_PRISON_DATA_START = 'FETCH_PRISON_DATA_START'
export const FETCH_PRISON_DATA_SUCCESS = 'FETCH_PRISON_DATA_SUCCESS'
export const FETCH_PRISON_DATA_FAILURE = 'FETCH_PRISON_DATA_FAILURE'

export const getPrisonData = () => {
  return dispatch => {
    dispatch({ type: FETCH_PRISON_DATA_START })
    axios
      .get('https://prisoner-skills-cj.herokuapp.com/api/prisons')
      .then(result => {
        console.log('axios get prisons result: ', result)
        dispatch({ type: FETCH_PRISON_DATA_SUCCESS, payload: result.data })
      })
      .catch(error => {
        console.log('axios get prisons error: ', error)
        dispatch({ type: FETCH_PRISON_DATA_FAILURE, payload: 'Sorry - there was an error getting prison data from our server' })
      })
  }
}