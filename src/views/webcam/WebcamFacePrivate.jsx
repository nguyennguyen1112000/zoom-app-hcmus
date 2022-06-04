import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Webcam from 'react-webcam'
import { addCaptureImage } from '../../actions/client'
import { authHeader } from '../../helper/utils'
import { SpinnerCircularFixed } from 'spinners-react'
const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: 'user'
}

export const WebcamFacePrivate = (props) => {
  const { studentId } = props

  const [image, setImage] = useState('')
  const dispatch = useDispatch()
  const webcamRef = useRef(null)
  const canvasRef = React.useRef()

  const videoHeight = 480
  const videoWidth = 640
  const API_URL = process.env.REACT_APP_API_URL
  const [loading, setLoading] = useState(false)
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    setImage(imageSrc)
    const action = addCaptureImage(imageSrc)
    dispatch(action)
  }, [webcamRef])

  const verifyImage = (e) => {
    const imageName = `${studentId}_${Math.random() * 1000}.jpg`
    fetch(image)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], imageName, { type: 'image/jpg' })
        let formData = new FormData()
        formData.append('file', file)
        formData.append('studentId', studentId)
        setLoading(true)
        axios
          .post(`${API_URL}/images/collect/data/v1`, formData, authHeader())
          .then((res) => {
            setLoading(false)
            toast.success('Upload successfully', {
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
            setLoading(false)
            toast.error(err?.response?.data?.message, {
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
              //onPlay={handleVideoOnPlay}
              className='media-box'
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
              {' '}
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setImage('')
                  dispatch(addCaptureImage(null))
                }}
                className='btn btn-danger  btn-icon right-icon mr-2'
              >
                <i className='fa fa-refresh' />
                <span>Retake picture</span>
              </button>
              <button
                onClick={verifyImage}
                className='btn btn-success  btn-icon right-icon'
              >
                <span>Submit image</span> <i className='fa fa-arrow-right' />{' '}
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
              <i className='fa fa-camera' />
              <span>Take picture</span>
            </button>
          </div>
        )}
      </div>
      <div className='spinner-loading'>
        <SpinnerCircularFixed
          size={100}
          thickness={200}
          color='#2986CC'
          enabled={loading}
        />
      </div>
      <ToastContainer />
    </>
  )
}
