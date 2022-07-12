/* eslint-disable no-const-assign */
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
import socketIOClient from 'socket.io-client'
import { authHeader } from '../../helper/utils'
import Swal from 'sweetalert2'
import Spinner from '../../components/spinner/dotted'

const config = {
  debug: false,
  modelBasePath: 'https://cdn.jsdelivr.net/npm/@vladmandic/human/models',
  face: { enabled: true },
  body: { enabled: false },
  hand: { enabled: false },
  object: { enabled: false }
}
export const RealtimeWebcam = (props) => {
  const { roomId, studentId } = props
  const [image, setImage] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()
  const webcamRef = useRef(null)
  const [video, setVideo] = useState(document.getElementById('inputVideo'))
  const [human, setHuman] = useState(null)
  const [position, setPosition] = useState(null)
  const [text, setText] = useState('')
  const [uploading, setUploading] = useState(false)
  const getRandomItem = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length)
    const item = arr[randomIndex]
    return item
  }
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState('')
  const API_URL = process.env.REACT_APP_API_URL
  const socketRef = useRef()
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    setImage(imageSrc)
    const action = addCaptureImage(imageSrc)
    dispatch(action)
  }, [webcamRef])
  useEffect(() => {
    setLoading(true)
    const headPositions = [
      'facing left',
      'head up',
      'facing right',
      'head down'
    ]
    setPosition(getRandomItem(headPositions))
    socketRef.current = socketIOClient.connect(API_URL)
    return () => {
      socketRef.current.disconnect()
    }
  }, [])
  const instruction = () => {
    switch (position) {
      case 'facing left':
        setText('turn your head 45 degrees to the left')
        break
      case 'head up':
        setText('Keep your head Up')
        break
      case 'head down':
        setText('Keep your head down')
        break
      case 'head right':
        setText('turn your head 45 degrees to the right')
        break
      case 'facing center':
        setText('Facing center')
        break
      default:
        setText('')
        break
    }
  }

  const sendNotification = (data) => {
    socketRef.current.emit('msgToServer', data)
  }
  const streamCamVideo = () => {
    var constraints = { audio: true, video: { width: 640, height: 480 } }
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (mediaStream) {
        var currentVideo = document.querySelector('video')

        currentVideo.srcObject = mediaStream
        currentVideo.onloadedmetadata = function (e) {
          currentVideo.play()
        }
        setVideo(currentVideo)
      })
      .catch(function (err) {
        console.log(err.name + ': ' + err.message)
      })
  }

  useEffect(() => {
    import('@vladmandic/human/dist/human.esm').then((H) => {
      const human = new H.default(config)
      setState('Loading models...')
      human.load().then(() => {
        setState('Initializing...')
        human.warmup().then(() => {
          setState('Ready...')
          setLoading(false)
        })
      })
      setHuman(human)
    })
    streamCamVideo()
  }, [])
  useEffect(() => {
    const timer = window.setInterval(async () => {
      if (video && !uploading) {
        instruction()
        const currentHuman = await human.detect(video)
        const gestures = currentHuman.gesture
        console.log(gestures)
        if (position && gestures) {
          if (gestures.some((g) => g.gesture === position)) {
            if (position === 'facing center') {
              const canvas = document.createElement('canvas')
              canvas.width = 640
              canvas.height = 480
              canvas
                .getContext('2d')
                .drawImage(video, 0, 0, canvas.width, canvas.height)
              canvas.toBlob(function (blob) {
                setLoading(true)
                setUploading(true)
                setState('Verifying...')
                verifyImage(blob)
                setPosition(null)
              })
            } else setPosition('facing center')
          }
        }
      }
    }, 1000)
    return () => window.clearInterval(timer)
  })
  const verifyImage = (blob) => {
    const file = new File(
      [blob],
      `${Math.random().toString(36).slice(2)}.jpg`,
      { type: 'image/jpg' }
    )
    let formData = new FormData()
    formData.append('file', file)
    formData.append('studentId', studentId)
    formData.append('roomId', roomId)
    axios
      .post(`${API_URL}/identity`, formData, authHeader())
      .then((res) => {
        setLoading(false)
        const { record, errorMessage } = res.data
        let error
        if (errorMessage) {
          if (errorMessage.verifySuccess)
            error = 'You checked-in successfully before for this room'
          else if (!errorMessage.timeToVerify)
            error = `It's not time for check-in`
          else if (errorMessage.failExceed)
            error = `You have exceeded the maximum amount of check-in time for this room`
        }
        if (record) sendNotification(record.roomId)
        if (!errorMessage && record?.faceStatus === false) {
          error = 'Face not match with your reference face data'
          setUploading(false)
          setPosition('facing center')
        }

        if (record?.faceStatus === true)
          history.push(`/room/${roomId}/verify/s2?record_id=${record.id}`)
        else
          Swal.fire({
            title: '<strong>Face recognition result</strong>',
            icon: 'warning',
            html: ` 
        <div className="panel panel-default card-view">
        <div className="panel-heading">
            <div className="pull-left">
              <h6 className="panel-title txt-dark">Reasons for failing recognition</h6>
            </div>
            <div className="clearfix" />
          </div>
          
         
          <div className="panel-wrapper collapse in">
            <div className="panel-body">
            ${`<p className='text-muted'>
                ${error}
              </p>`}

            </div>
          </div>
        </div>
      `,
            showCloseButton: false,
            showCancelButton: false
          })
      })
      .catch((err) => {
        setUploading(false)
        setLoading(false)
        setPosition('facing center')
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
  }
  return (
    <div>
      {text && (
        <div className='form-group text-center introduce-text'>
          <h5 style={{ 'text-transform': 'uppercase', color: 'white' }}>
            {text}
          </h5>
        </div>
      )}
      <div className='mt-10'>
        <div style={{ textAlign: 'center' }}>
          <video
            className='media-box'
            id='inputVideo'
            autoplay
            muted
            style={{ position: 'relative' }}
          ></video>
          <canvas id='canvas' width='640' height='480'></canvas>
        </div>
      </div>
      <Spinner loading={loading} text={state} />
      <ToastContainer />
    </div>
  )
}
