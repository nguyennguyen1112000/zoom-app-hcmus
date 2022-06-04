import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Webcam from 'react-webcam'
import { addCaptureImage } from '../../actions/client'
const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: 'user'
}

export const WebcamData = (props) => {
  const { input, validate } = props

  const [image, setImage] = useState('')
  const dispatch = useDispatch()
  const webcamRef = useRef(null)
  const canvasRef = React.useRef()

  const videoHeight = 480
  const videoWidth = 640
  const API_URL = process.env.REACT_APP_API_URL
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    setImage(imageSrc)
    const action = addCaptureImage(imageSrc)
    dispatch(action)
  }, [webcamRef])

  const verifyImage = (e) => {
    e.preventDefault()
    const err = !validate()
    if (err) return

    fetch(image)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File(
          [blob],
          "face.jpg",
          { type: 'image/jpg' }
        )
        let formData = new FormData()
        formData.append('file', file)
        formData.append('studentId', input.studentId)
        formData.append('type', input.type)
        formData.append('name', input.name)

        axios
          .post(`${API_URL}/images/collect/data`, formData)
          .then((res) => {
            toast.success('Tải lên ảnh thành công', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            })
            setImage('')
          })

          .catch((err) => {
            toast.error(err.response.data, {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            })
          })
      })
  }
  return (
    <>
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '10px'
          }}
        >
          {image == '' ? (
            <Webcam
              audio={false}
              height={videoHeight}
              ref={webcamRef}
              screenshotFormat='image/jpeg'
              width={videoWidth}
              videoConstraints={videoConstraints}
              className="media-box"
              //onPlay={handleVideoOnPlay}
            />
          ) : (
            <img src={image} />
          )}
          <canvas ref={canvasRef} style={{ position: 'absolute' }} />
        </div>
      </div>
      <div>
        {image != '' ? (
          <div className='form-group text-center'>
            <div className='button-list'>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setImage('')
                  dispatch(addCaptureImage(null))
                }}
                className='btn btn-danger  btn-icon right-icon mr-2'
              >
                <i className='fa fa-refresh' /> <span>Retake photo</span>
              </button>
              <button
                onClick={verifyImage}
                className='btn btn-success  btn-icon right-icon'
              >
                <i className='fa fa-arrow-right' />
                <span>Submit image</span>
              </button>
            </div>
          </div>
        ) : (
          <div className='form-group text-center'>
            <button
              className='btn btn-danger  btn-icon right-icon'
              onClick={(e) => {
                e.preventDefault()
                capture()
              }}
            >
              <span>Take picture</span> <i className='fa fa-camera' />{' '}
            </button>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  )
}
