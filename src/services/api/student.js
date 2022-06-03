import axios from 'axios'
import { userLogout } from '../../actions/auth'
import {
  getAllStudents,
  getMyIdentityResults,
  getOneStudent
} from '../../actions/student'
import { authHeader, logOut } from '../../helper/utils'
const API_URL = process.env.REACT_APP_API_URL
export const getStudents = () => {
  return (dispatch) => {
    return axios
      .get(`${API_URL}/students`, authHeader())
      .then((res) => {
        const studentList = res.data
        const action = getAllStudents(studentList)
        dispatch(action)
      })
      .catch((err) => {
        if (err.response.status === 401) {
          const logoutAction = userLogout()
          logOut()
          dispatch(logoutAction)
        }
        console.log('Fail to get data')
      })
  }
}

export const getStudent = (studentId) => {
  return (dispatch) => {
    return axios
      .get(`${API_URL}/students/${studentId}`, authHeader())
      .then((res) => {
        const student = res.data
        const action = getOneStudent(student)
        dispatch(action)
      })
      .catch((err) => {
        if (err.response.status === 401) {
          const logoutAction = userLogout()
          logOut()
          dispatch(logoutAction)
        }
        console.log('Fail to get data')
      })
  }
}

export const getIdentityResults = (roomId) => {
  return (dispatch) => {
    return axios
      .get(`${API_URL}/identity-record/room/${roomId}/me`, authHeader())
      .then((res) => {
        const records = res.data
        console.log("!!!",records);
        const action = getMyIdentityResults(records)
        dispatch(action)
      })
      .catch((err) => {
        if (err.response.status === 401) {
          const logoutAction = userLogout()
          logOut()
          dispatch(logoutAction)
        }
        console.log('Fail to get data')
      })
  }
}
