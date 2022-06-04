import { GET_IDENTITY_SESSION } from './type'

export const getIdentitySession = (session) => {
  return {
    type: GET_IDENTITY_SESSION,
    payload: session
  }
}
