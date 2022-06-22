/* eslint-disable no-undef */
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SpinnerCircularFixed } from 'spinners-react'
import Webcam from 'react-webcam'
import { addCaptureImage } from '../../actions/client'
import socketIOClient from 'socket.io-client'
import { authHeader } from '../../helper/utils'
import Swal from 'sweetalert2'
const videoConstraints = {
  width: 680,
  height: 480,
  facingMode: 'user'
}
export const WebcamID = (props) => {
  const { roomId,  type } = props
  const [image, setImage] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()
  const webcamRef = useRef(null)
  const canvasRef = React.useRef()
  const videoHeight = 480
  const videoWidth = 640
  const API_URL = process.env.REACT_APP_API_URL
  const socketRef = useRef()
  const [loading, setLoading] = useState(false)
  const { search } = useLocation()
  const recordId = new URLSearchParams(search).get('record_id')
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    setImage(imageSrc)
    const action = addCaptureImage(imageSrc)
    dispatch(action)
  }, [webcamRef, dispatch])
  useEffect(() => {
    socketRef.current = socketIOClient.connect(API_URL)
    return () => {
      socketRef.current.disconnect()
    }
  }, [])
  const sendNotification = (data) => {
    socketRef.current.emit('msgToServer', data)
  }

  const verifyID = (e) => {
    e.preventDefault()
    fetch(image)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File(
          [blob],
          `${Math.random().toString(36).slice(2)}.jpg`,
          { type: 'image/jpg' }
        )
        let formData = new FormData()
        formData.append('file', file)
        formData.append('recordId', recordId)
        formData.append('type', type)
        setLoading(true)
        axios
          .post(`${API_URL}/identity/id`, formData, authHeader())
          .then((res) => {
            setLoading(false)
            console.log('Data', res.data)
            const { extractFields, errorMessages, record } = res.data
            if (record) sendNotification(record.roomId)
            if (record?.idStatus === true)
              history.push(`/room/${roomId}/verify/result/${record.id}`)
            else if (!record) {
              let error

              if (errorMessages) {
                if (errorMessages.verifySuccess)
                  error = 'You checked-in successfully before for this room'
                else if (!errorMessages.timeToVerify)
                  error = `It's not time for check-in`
                else if (errorMessages.failExceed)
                  error = `You have exceeded the maximum amount of check-in time for this room`
              }
              Swal.fire({
                title: '<strong>Id Document verification result</strong>',
                icon: 'warning',
                html: ` 
        <div className="panel panel-default card-view">
        <div className="panel-heading">
            <div className="pull-left">
              <h6 className="panel-title txt-dark">Reasons for failing verification</h6>
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
            } else {
              Swal.fire({
                title: '<strong>Identity result</strong>',
                icon: 'warning',
                html: ` 
        <div className="panel panel-default card-view">
        <div className="panel-heading">
            <div className="pull-left">
              <h6 className="panel-title txt-dark">${
                record?.cardImage?.type === 'student_card'
                  ? 'STUDENT ID'
                  : 'IDENTITY CARD'
              }</h6>
            </div>
            <div className="clearfix" />
          </div>
          <div className="panel-wrapper collapse in">
            <div className="panel-body">
              <p className="text-muted">${extractFields.name1} ->
                ${
                  extractFields.matchName
                    ? extractFields.name2
                    : `<mark>${extractFields.name2}</mark>`
                }
               
              </p>
              <p className="text-muted">${extractFields.dob1}->
                ${
                  extractFields.matchDob
                    ? extractFields.dob2
                    : `<mark>${extractFields.dob2}</mark>`
                }
               
              </p>
              ${
                record?.cardImage?.type === 'student_card'
                  ? `<p className="text-muted">${extractFields.studentId1}->
                ${
                  extractFields.matchStudentId
                    ? extractFields.studentId2
                    : `<mark>${extractFields.studentId2}</mark>`
                }
               
              </p>`
                  : ''
              }
            </div>
          </div>
          ${
            errorMessages.length > 0
              ? `<div className='panel-heading'>
                <div className='pull-left'>
                  <h6 className='panel-title txt-dark'>
                    Reasons for failing verification
                  </h6>
                </div>
                <div className='clearfix' />
              </div>`
              : ''
          }
          <div className="panel-wrapper collapse in">
            <div className="panel-body">
            ${errorMessages.map(
              (err, index) =>
                `<p className='text-muted'>
                ${index + 1}. ${err}
              </p>`
            )}

            </div>
          </div>
        </div>
      `,
                showCloseButton: false,
                showCancelButton: false
              })
            }
            //console.log('err', errorMessages)
          })
          .catch((err) => {
            setLoading(false)
            toast.error(err?.response?.data?.message, {
              position: 'top-center',
              autoClose: 5000,
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '10px'
          }}
        >
          {image === '' ? (
            <Webcam
              audio={false}
              height={videoHeight}
              ref={webcamRef}
              screenshotFormat='image/jpeg'
              width={videoWidth}
              videoConstraints={videoConstraints}
              className='media-box'
              //onPlay={handleVideoOnPlay}
            />
          ) : (
            <img src={image} alt='capture_image' />
          )}
          <canvas ref={canvasRef} style={{ position: 'absolute' }} />
        </div>
      </div>
      <div>
        <div className='spinner-loading'>
          <SpinnerCircularFixed
            size={100}
            thickness={100}
            color='#2986CC'
            enabled={loading}
          />
        </div>
        {image !== '' ? (
          <div className='form-group text-center'>
            <div className='button-list'>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setImage('')
                  dispatch(addCaptureImage(null))
                }}
                className='btn btn-primary  btn-icon right-icon mr-2'
              >
                <i className='fa fa-refresh' />
                <span>Retake picture</span>
              </button>
              <button
                onClick={verifyID}
                className='btn btn-success  btn-icon right-icon'
              >
                <span>Submit image</span> <i className='fa fa-arrow-right' />{' '}
              </button>
            </div>
          </div>
        ) : (
          <div className='form-group text-center'>
            <button
              className='btn btn-primary  btn-icon right-icon'
              onClick={(e) => {
                e.preventDefault()
                capture()
              }}
            >
              <span>Take picture</span> <i className='fa fa-camera' />
            </button>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  )
}
