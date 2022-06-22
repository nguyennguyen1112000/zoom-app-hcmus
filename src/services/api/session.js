import axios from 'axios'
import { userLogout } from '../../actions/auth'
import { getIdentitySession} from '../../actions/session'
import { authHeader, logOut } from '../../helper/utils'

const API_URL = process.env.REACT_APP_API_URL
export const getIdentitySessions = () => {
  return (dispatch) => {
    return axios
      .get(`${API_URL}/identity-record`, authHeader())
      .then((res) => {
        const action = getIdentitySession(res.data)
        dispatch(action)
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          const logoutAction = userLogout()
          logOut()
          dispatch(logoutAction)
        }
      })
  }
}

export const getRoomIdentitySession = (id) => {
  return (dispatch) => {
    return axios
      .get(`${API_URL}/identity-record/room/${id}`, authHeader())
      .then((res) => {
        const action = getIdentitySession(res.data)
        dispatch(action)
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          const logoutAction = userLogout()
          logOut()
          dispatch(logoutAction)
        }
      })
  }
}

export const getStudentdentitySession = (roomId, studentId) => {
  return (dispatch) => {
    return axios
      .get(`${API_URL}/identity-record/room/${roomId}/${studentId}`, authHeader())
      .then((res) => {
        const action = getIdentitySession(res.data)
        dispatch(action)
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          const logoutAction = userLogout()
          logOut()
          dispatch(logoutAction)
        }
      })
  }
}
