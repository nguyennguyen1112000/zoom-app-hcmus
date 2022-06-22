import axios from 'axios'
import { getIdentityResult } from '../../actions/client'
const API_URL = process.env.REACT_APP_API_URL


export const getIdentity = (id) => {
  return (dispatch) => {
    return axios
      .get(`${API_URL}/identity-record/${id}`)
      .then((res) => {
        const action = getIdentityResult(res.data)
        dispatch(action)
      })
      .catch((err) => {
        console.log('Fail to get data identity result')
      })
  }
}
