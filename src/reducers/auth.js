import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REFRESH_ZOOM_TOKEN
} from '../actions/type'

const user = JSON.parse(localStorage.getItem('user'))
const authReducerInitialState = user
  ? {
      currentUser: user,
      isLoggedIn: true
    }
  : { currentUser: null, isLoggedIn: false }

const authReducer = (state = authReducerInitialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, isLoggedIn: true, currentUser: action.payload }
    case REFRESH_ZOOM_TOKEN:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          zoom_access_token: action.payload?.access_token,
          zoom_refresh_token: action.payload?.refresh_token
        }
      }
    case LOGIN_FAIL:
      return { ...state, isLoggedIn: false, currentUser: null }
    case LOGOUT:
      return { ...state, isLoggedIn: false, currentUser: null }

    default:
      return state
  }
}
export default authReducer
