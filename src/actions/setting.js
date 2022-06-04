import { GET_SETTING } from './type'

export const getSetting = (setting) => {
  return {
    type: GET_SETTING,
    payload: setting
  }
}
