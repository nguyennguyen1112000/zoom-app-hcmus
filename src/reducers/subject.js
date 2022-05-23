import { GET_SUBJECT, GET_SUBJECTS } from '../actions/type'

const subjectReducerInitialState = {
  subjects: [],
  currentSubject: null
}
const subjectReducer = (state = subjectReducerInitialState, action) => {
  switch (action.type) {
    case GET_SUBJECTS:
      return { ...state, subjects: action.payload }
    case GET_SUBJECT:
      return { ...state, currentSubject: action.payload }
    default:
      return state
  }
}
export default subjectReducer
