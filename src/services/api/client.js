import axios from 'axios'
import { userLogout } from '../../actions/auth'
import { verifyRoom } from '../../actions/client'
import { authHeader, logOut } from '../../helper/utils'
const API_URL = process.env.REACT_APP_API_URL
export const verifyZoomRoom = (
  zoomId,
  passcode,
  linkZoom,
  studentId,
  verifyRoom
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
        }
      })
      .catch((err) => {
        verifyRoom(false)
        if (err.response.status === 401) {
          const logoutAction = userLogout()
          logOut()
          dispatch(logoutAction)
        }
        console.log('Fail to get data of zoom rooms')
      })
  }
}

// export const createClass = (classroom) => {
//   return (dispatch) => {
//     return axios
//       .post(`${API_URL}/classrooms`, classroom, authHeader())
//       .then((res) => {
//         const createdClass = res.data
//         const action = addNewClass(createdClass)
//         dispatch(action)
//       })
//       .catch((err) => {
//         if (err.response.status === 401) {
//           const logoutAction = userLogout()
//           logOut()
//           dispatch(logoutAction)
//         }
//         console.log('Fail to create new class')
//       })
//   }
// }

// export const addUserToClass = (userToClass) => {
//   return (dispatch) => {
//     return axios
//       .post(`${API_URL}/user-to-class`, userToClass, authHeader())
//       .then((res) => {
//         console.log('Add user to class successfully')
//       })
//       .catch((err) => {
//         if (err.response.status === 401) {
//           const logoutAction = userLogout()
//           logOut()
//           dispatch(logoutAction)
//         }
//         console.log('Fail to add user to class')
//       })
//   }
// }

// export const getAllJoinedClasses = () => {
//   return (dispatch) => {
//     return axios
//       .get(`${API_URL}/user-to-class/user`, authHeader())
//       .then((res) => {
//         const classList = res.data
//         const action = getJoinedClasses(classList)
//         dispatch(action)
//       })
//       .catch((err) => {
//         if (err.response.status === 401) {
//           const logoutAction = userLogout()
//           logOut()
//           dispatch(logoutAction)
//         }
//         console.log('Fail to get data classes')
//       })
//   }
// }
