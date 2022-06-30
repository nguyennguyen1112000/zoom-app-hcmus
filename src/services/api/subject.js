import axios from 'axios'
import { userLogout } from '../../actions/auth'
import { getSubject, getSubjects } from '../../actions/subject'
import { authHeader, logOut } from '../../helper/utils'

const API_URL = process.env.REACT_APP_API_URL
export const getAllSubjects = () => {
  return (dispatch) => {
    return axios
      .get(`${API_URL}/subjects`, authHeader())
      .then((res) => {
        const action = getSubjects(res.data)
        dispatch(action)
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          const logoutAction = userLogout()
          logOut()
          dispatch(logoutAction)
        }
        console.log('Fail to get data')
      })
  }
}

export const getCurrentSubject = (id) => {
  return (dispatch) => {
    return axios
      .get(`${API_URL}/subjects/${id}`, authHeader())
      .then((res) => {
        const action = getSubject(res.data)
        dispatch(action)
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          const logoutAction = userLogout()
          logOut()
          dispatch(logoutAction)
        }
        console.log('Fail to get data')
      })
  }
}
