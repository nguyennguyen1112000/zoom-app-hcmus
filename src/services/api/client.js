import axios from 'axios'
import { userLogout } from '../../actions/auth'
import { getIdentityResult, verifyRoom } from '../../actions/client'
import { authHeader, logOut } from '../../helper/utils'
const API_URL = process.env.REACT_APP_API_URL
export const verifyZoomRoom = (
  zoomId,
  passcode,
  linkZoom,
  studentId,
  verifyRoom,
  setErrorVerified
) => {
  return (dispatch) => {
    return axios
      .get(
        `${API_URL}/rooms/currentRoom?studentId=${studentId}&zoomId=${zoomId}&passcode=${passcode}&linkZoom=${linkZoom}`
      )
      .then((res) => {
        console.log(res.data)
        if (res.data) {
          verifyRoom(true)
          setErrorVerified(false)
        }
      })
      .catch((err) => {
        verifyRoom(false)
        setErrorVerified(true)
        if (err.response.status === 401) {
          const logoutAction = userLogout()
          logOut()
          dispatch(logoutAction)
        }
        console.log('Fail to get data of zoom rooms')
      })
  }
}

export const getIdentity = (id) => {
  return (dispatch) => {
    return axios
      .get(`${API_URL}/identity-record/${id}`)
      .then((res) => {
        const action = getIdentityResult(res.data)
        dispatch(action)
      })
      .catch((err) => {
        console.log('Fail to get data identity result')
      })
  }
}
