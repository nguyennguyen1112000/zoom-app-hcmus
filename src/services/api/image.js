import axios from 'axios'
import { userLogout } from '../../actions/auth'
import { getAllImages, removeImage } from '../../actions/image'
import { addImageStudent } from '../../actions/student'
import { authHeader, logOut } from '../../helper/utils'
const API_URL = process.env.REACT_APP_API_URL
export const uploadImage = (file, student, type) => {
  return (dispatch) => {
    let formData = new FormData()
    formData.append('file', file)
    formData.append('studentId', student.studentId)
    formData.append('type', type)
    return axios
      .post(`${API_URL}/images/upload`, formData, authHeader())
      .then((res) => {
        if (res.data) {
          const addImage = addImageStudent(res.data)
          dispatch(addImage)
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          const logoutAction = userLogout()
          logOut()
          dispatch(logoutAction)
        }
        console.log('Error', err)
      })
  }
}

export const deleteImage = (imageId) => {
  return (dispatch) => {
    return axios
      .delete(`${API_URL}/images/${imageId}`, authHeader())
      .then((res) => {
        if (res.data) {
          //let newStudent = {...student};

          const removeImg = removeImage(imageId)
          dispatch(removeImg)
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          const logoutAction = userLogout()
          logOut()
          dispatch(logoutAction)
        }
        console.log('Error', err)
      })
  }
}

export const getMyImages = () => {
  return (dispatch) => {
    return axios
      .get(`${API_URL}/images/me`, authHeader())
      .then((res) => {
        if (res.data) {
          const getImages = getAllImages(res.data)
          dispatch(getImages)
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          const logoutAction = userLogout()
          logOut()
          dispatch(logoutAction)
        }
        console.log('Error', err)
      })
  }
}
