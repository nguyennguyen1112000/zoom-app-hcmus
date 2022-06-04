import { GET_SETTING } from '../actions/type'

const settingReducerInitialState = {
  setting: null
}
const settingReducer = (state = settingReducerInitialState, action) => {
  switch (action.type) {
    case GET_SETTING:
      return { ...state, setting: action.payload }

    default:
      return state
  }
}
export default settingReducer
