import axios from 'axios'
import { userLogout } from '../../actions/auth'
import { getSetting } from '../../actions/setting'
import { authHeader, logOut } from '../../helper/utils'

const API_URL = process.env.REACT_APP_API_URL
export const getDefaultSetting = () => {
  return (dispatch) => {
    return axios
      .get(`${API_URL}/configuration`, authHeader())
      .then((res) => {
        const action = getSetting(res.data)
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
