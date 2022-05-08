import { GET_ALL_ROOMS, GET_ONE_ROOM } from '../actions/type'

const roomReducerInitialState = {
  roomList: [],
  currentRoom: null
}
const roomReducer = (state = roomReducerInitialState, action) => {
  switch (action.type) {
    case GET_ALL_ROOMS:
      return { ...state, roomList: action.payload }
    case GET_ONE_ROOM:
      return { ...state, currentRoom: action.payload }
    // case GET_ALL_JOINED_CLASSES:
    //   return { ...state, joinedClasses: action.payload };
    // case CREATE_CLASS:
    //   let newClassList = [...state.classList];
    //   newClassList.push(action.payload);
    //   return { ...state, classList: newClassList };
    default:
      return state
  }
}
export default roomReducer
