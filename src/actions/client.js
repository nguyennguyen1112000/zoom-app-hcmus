import {
  CAPTURE_IMAGE,
  VERIFIED_STUDENT,
  VERIFIED_ROOM,
  ADD_CLIENT,
  GET_IDENTITY_RESULT
} from './type'

export const verifyStudent = (status) => {
  return {
    type: VERIFIED_STUDENT,
    payload: status
  }
}
export const verifyRoom = (status) => {
  return {
    type: VERIFIED_ROOM,
    payload: status
  }
}
export const addCaptureImage = (image) => {
  return {
    type: CAPTURE_IMAGE,
    payload: image
  }
}

export const addClient = (client) => {
  return {
    type: ADD_CLIENT,
    payload: client
  }
}

export const getIdentityResult = (result) => {
  return {
    type: GET_IDENTITY_RESULT,
    payload: result
  }
}
