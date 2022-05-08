import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
//import "./cameraStyles.css";
//import "../style/home.css";
import Webcam from 'react-webcam'
import { addCaptureImage } from '../../actions/client'
const videoConstraints = {
  width: 680,
  height: 480,
  facingMode: 'user'
}
export const WebcamCapture = () => {
  const [image, setImage] = useState('')
  const dispatch = useDispatch()

  const webcamRef = useRef(null)
  const canvasRef = React.useRef()
  const videoHeight = 480
  const videoWidth = 640
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    setImage(imageSrc)
    const action = addCaptureImage(imageSrc)
    dispatch(action)
  }, [webcamRef])
  return (
    <div>
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
          <button
            onClick={(e) => {
              e.preventDefault()
              setImage('')
              dispatch(addCaptureImage(null))
            }}
            className='btn btn-success btn-lg text-center'
          >
            Chụp lại
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault()
              capture()
            }}
            className='btn btn-success btn-lg text-center'
          >
            Chụp
          </button>
        )}
      </div>
    </div>
  )
}
