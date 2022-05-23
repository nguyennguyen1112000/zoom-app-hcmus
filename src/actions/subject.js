import { GET_SUBJECT, GET_SUBJECTS } from './type'

export const getSubjects = (subjects) => {
  return {
    type: GET_SUBJECTS,
    payload: subjects
  }
}

export const getSubject = (subject) => {
  return {
    type: GET_SUBJECT,
    payload: subject
  }
}
