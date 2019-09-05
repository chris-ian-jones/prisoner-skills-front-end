import {
  FETCH_PRISON_DATA_START,
  FETCH_PRISON_DATA_SUCCESS,
  FETCH_PRISON_DATA_FAILURE
} from './../actions'

const initialState = {
  prisons: [],
  isLoading: false,
  error: ''
}

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_PRISON_DATA_START:
      return {
        ...state,
        isLoading: true,
        error: ''
      }
    case FETCH_PRISON_DATA_SUCCESS:
      return {
        ...state,
        prisons: action.payload,
        isLoading: false,
        error: ''
      }
    case FETCH_PRISON_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    default:
      return state
  }
}