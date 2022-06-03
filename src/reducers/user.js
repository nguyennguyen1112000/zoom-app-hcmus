import {  GET_USERS } from '../actions/type'

const userReducerInitialState = {
  userList: []
}
const userReducer = (state = userReducerInitialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, userList: action.payload }

    default:
      return state
  }
}
export default userReducer
