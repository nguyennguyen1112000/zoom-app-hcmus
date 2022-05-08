import { GET_ALL_IMAGES, REMOVE_IMAGE } from './type'

export const getAllImages = (imageList) => {
  return {
    type: GET_ALL_IMAGES,
    payload: imageList
  }
}

export const removeImage = (imageId) => {
  return {
    type: REMOVE_IMAGE,
    payload: imageId
  }
}

