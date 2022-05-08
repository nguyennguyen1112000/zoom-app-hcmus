import { CAPTURE_IMAGE, VERIFIED_STUDENT, VERIFIED_ROOM } from './type'

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
