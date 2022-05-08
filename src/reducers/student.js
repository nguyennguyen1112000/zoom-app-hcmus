import {
  ADD_IMAGE,
  GET_ALL_STUDENTS,
  GET_ONE_STUDENT,
  REMOVE_IMAGE
} from '../actions/type'

const studentReducerInitialState = {
  studentList: [],
  currentStudent: null
}
const studentReducer = (state = studentReducerInitialState, action) => {
  switch (action.type) {
    case GET_ALL_STUDENTS:
      return { ...state, studentList: action.payload }
    case GET_ONE_STUDENT:
      return { ...state, currentStudent: action.payload }
    case ADD_IMAGE:
      const images = state.currentStudent.images
      images.push(action.payload)
      return {
        ...state,
        currentStudent: {
          ...state.currentStudent,
          images: images
        }
      }
    case REMOVE_IMAGE:
      const currentImages = state.currentStudent.images.filter(
        (x) => x.id !== parseInt(action.payload)
      )
      return {
        ...state,
        currentStudent: {
          ...state.currentStudent,
          images: currentImages
        }
      }
    default:
      return state
  }
}
export default studentReducer
