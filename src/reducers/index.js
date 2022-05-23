import { combineReducers } from 'redux'
import authReducer from './auth'
import clientReducer from './client'
import imageReducer from './image'
import roomReducer from './room'
import studentReducer from './student'
import subjectReducer from './subject'

const rootReducer = combineReducers({
  auth: authReducer,
  room: roomReducer,
  image: imageReducer,
  student: studentReducer,
  client: clientReducer,
  subject: subjectReducer
})

export default rootReducer
