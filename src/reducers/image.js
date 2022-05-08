import { GET_ALL_IMAGES } from '../actions/type'

const imageReducerInitialState = {
  imageList: []
}
const imageReducer = (state = imageReducerInitialState, action) => {
  switch (action.type) {
    case GET_ALL_IMAGES:
      return { ...state, imageList: action.payload }
    default:
      return state
  }
}
export default imageReducer
