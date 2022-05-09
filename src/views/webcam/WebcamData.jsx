import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//import "./cameraStyles.css";
//import "../style/home.css";
import Webcam from 'react-webcam'
import { addCaptureImage } from '../../actions/client'
import { getVerifiedInfo } from '../../helper/utils'
const videoConstraints = {
  width: 680,
  height: 480,
  facingMode: 'user'
}
export const WebcamData = () => {
  const [image, setImage] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()
  const webcamRef = useRef(null)
  const canvasRef = React.useRef()
  const [studentId, setStudentId] = useState('')
  const [err, setErr] = useState(false)

  const videoHeight = 480
  const videoWidth = 640
  const API_URL = process.env.REACT_APP_API_URL
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    setImage(imageSrc)
    const action = addCaptureImage(imageSrc)
    dispatch(action)
  }, [webcamRef])
  const handleChange = (e) => {
    setStudentId(e.target.value)
  }
  const verifyImage = (e) => {
    e.preventDefault()
    if (studentId === '') {
      setErr(true)
      return
    }

    fetch(image)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], 'face.jpg', { type: 'image/jpg' })
        let formData = new FormData()
        const data = getVerifiedInfo()
        formData.append('file', file)
        formData.append('studentId', data.studentId)

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
    <div>
      <div>
        <div className='form-wrap'>
          <form>
            <div className='form-group'>
              <label className='control-label mb-10 text-left'>MSSV</label>
              <input
                type='text'
                className='form-control'
                placeholder='Nhập MSSV'
                name='MSSV'
                onChange={handleChange}
              />
              {err && (
                <div className='danger-block'>Không được dể trống</div>
              )}
            </div>
          </form>
        </div>
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
              <span>Tải ảnh lên</span> <i className='fa fa-upload' />{' '}
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
