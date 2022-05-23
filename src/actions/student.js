import { ADD_IMAGE, GET_ALL_STUDENTS, GET_IDENTITY_RESULTs, GET_ONE_STUDENT } from './type'

export const getAllStudents = (studentList) => {
  return {
    type: GET_ALL_STUDENTS,
    payload: studentList
  }
}

export const getOneStudent = (student) => {
  return {
    type: GET_ONE_STUDENT,
    payload: student
  }
}

export const addImageStudent = (image) => {
  return {
    type: ADD_IMAGE,
    payload: image
  }
}

export const getMyIdentityResults = (records) => {
  return {
    type: GET_IDENTITY_RESULTs,
    payload: records
  }
}