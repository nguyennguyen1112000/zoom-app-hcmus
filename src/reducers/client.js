import { CAPTURE_IMAGE, VERIFIED_ROOM, VERIFIED_STUDENT } from '../actions/type'

const clientReducerInitialState = {
  image: null,
  verifiedStudent: false,
  verifiedRoom: false
}
const clientReducer = (state = clientReducerInitialState, action) => {
  switch (action.type) {
    case VERIFIED_STUDENT:
      return { ...state, verifiedStudent: action.payload }
    case VERIFIED_ROOM:
      return { ...state, verifiedRoom: action.payload }
    case CAPTURE_IMAGE:
      return { ...state, image: action.payload }
    default:
      return state
  }
}
export default clientReducer
