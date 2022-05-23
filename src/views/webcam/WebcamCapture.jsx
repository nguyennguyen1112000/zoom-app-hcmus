import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//import "./cameraStyles.css";
//import "../style/home.css";
import Webcam from 'react-webcam'
import { addCaptureImage } from '../../actions/client'
import LoadingSpinner from '../../components/loading/loading-spinner'
import socketIOClient from 'socket.io-client'
const videoConstraints = {
  width: 680,
  height: 480,
  facingMode: 'user'
}
export const WebcamCapture = (props) => {
  const { roomId, studentId } = props
  const [image, setImage] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()
  const webcamRef = useRef(null)
  const canvasRef = React.useRef()
  const videoHeight = 480
  const videoWidth = 640
  const API_URL = process.env.REACT_APP_API_URL
  const [isLoading, setIsLoading] = useState(false)
  const socketRef = useRef()
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    setImage(imageSrc)
    const action = addCaptureImage(imageSrc)
    dispatch(action)
  }, [webcamRef])
  useEffect(() => {
    socketRef.current = socketIOClient.connect(API_URL)
    return () => {
      socketRef.current.disconnect()
    }
  }, [])
  const sendNotification = (data) => {    
    socketRef.current.emit('msgToServer', data)
  }
  const verifyImage = (e) => {
    e.preventDefault()
    fetch(image)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], 'face.jpg', { type: 'image/jpg' })
        let formData = new FormData()
        formData.append('file', file)
        formData.append('studentId', studentId)
        formData.append('roomId', roomId)
        setIsLoading(true)
        axios
          .post(`${API_URL}/identity`, formData)
          .then((res) => {
            setIsLoading(false)
            const identifiedRes = res.data
            sendNotification(identifiedRes.roomId)
            if (identifiedRes.status)
              history.push(`/room/${roomId}/verify/result/${identifiedRes.id}`)
            else
              toast.error('Xác thực thất bại, vui lòng thử lại', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
              })
          })
          .catch((err) => {
            setIsLoading(false)
            console.log('err', err)
          })
      })
  }
  return (
    <div>
      {isLoading ? <LoadingSpinner /> : <></>}
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
            <button
              onClick={(e) => {
                e.preventDefault()
                setImage('')
                dispatch(addCaptureImage(null))
              }}
              className='btn btn-danger  btn-icon right-icon mr-2'
            >
              <span>Chụp lại</span> <i className='fa fa-camera' />{' '}
            </button>
            <button
              onClick={verifyImage}
              className='btn btn-success  btn-icon right-icon'
            >
              <span>Xác thực</span> <i className='fa fa-arrow-right' />{' '}
            </button>
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
              <span>Chụp</span> <i className='fa fa-camera' />{' '}
            </button>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  )
}
