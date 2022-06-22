import axios from 'axios'
import { userLogout } from '../../actions/auth'
import { getUsers } from '../../actions/user'
import { authHeader, logOut } from '../../helper/utils';

const API_URL = process.env.REACT_APP_API_URL
export const getAllUsers= (type) => {
  return (dispatch) => {
    return axios
      .get(`${API_URL}/users?type=${type}`, authHeader())
      .then((res) => {
        const action = getUsers(res.data)
        console.log(res.data);
        dispatch(action)
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          const logoutAction = userLogout()
          logOut()
          dispatch(logoutAction)
        }
      })
  }
}
