import { GET_IDENTITY_SESSION } from '../actions/type'

const sessionReducerInitialState = {
  identity: []
}
const sessionReducer = (state = sessionReducerInitialState, action) => {
  switch (action.type) {
    case GET_IDENTITY_SESSION:
      return { ...state, identity: action.payload }

    default:
      return state
  }
}
export default sessionReducer
