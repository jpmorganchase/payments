import {client} from '../client'

const initialState = []

export default function apiStatusReducer(state = initialState, action) {
  switch (action.type) {
    case 'apiStatus/apiStatusLoaded': {
      return action.payload
    }
    default:
      return state
  }
}

// Thunk function
export async function fetchApiStatus(dispatch) {
  const response = await client.get('v1/outages')
  // eslint-disable-next-line no-console
  console.log(response);
  dispatch({ type: 'apiStatus/apiStatusLoaded', payload: response.apiStatus })
}
