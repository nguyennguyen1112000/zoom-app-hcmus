import {
  ADD_CLIENT,
  CAPTURE_IMAGE,
  GET_IDENTITY_RESULT,
  VERIFIED_ROOM,
  VERIFIED_STUDENT
} from '../actions/type'

const clientReducerInitialState = {
  image: null,
  verifiedStudent: false,
  verifiedRoom: false,
  client: null,
  identityResult: null
}
const clientReducer = (state = clientReducerInitialState, action) => {
  switch (action.type) {
    case VERIFIED_STUDENT:
      return { ...state, verifiedStudent: action.payload }
    case VERIFIED_ROOM:
      return { ...state, verifiedRoom: action.payload }
    case CAPTURE_IMAGE:
      return { ...state, image: action.payload }
    case ADD_CLIENT:
      return { ...state, client: action.payload }
    case GET_IDENTITY_RESULT:
      return { ...state, identityResult: action.payload }
    default:
      return state
  }
}
export default clientReducer
