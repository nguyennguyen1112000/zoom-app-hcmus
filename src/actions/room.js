import { GET_ALL_ROOMS, GET_ONE_ROOM } from './type'

export const getAllRooms = (roomList) => {
  return {
    type: GET_ALL_ROOMS,
    payload: roomList
  }
}

export const getOneRoom = (room) => {
  return {
    type: GET_ONE_ROOM,
    payload: room
  }
}