import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addClient } from '../../actions/client'
//import { useHistory } from 'react-router-dom'
import { getClient, logOut } from '../../helper/utils'
import { verifyZoomRoom } from '../../services/api/client'
import { WebcamCapture } from '../webcam/WebcamCapture'

//import './css/style.css'

function VerificationStep1() {
  // const [webcamMode, setWebcamMode] = useState(true)
  // const verifiedImage = useSelector((state) => state.client.image)
  // const verifiedStudent = useSelector((state) => state.client.verifiedStudent)
  const [verifiedRoom, setVerifiedRoom] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const client = getClient()

  const API_URL = process.env.REACT_APP_API_URL
  //const history = useHistory()
  const [input, setInput] = useState({
    zoomId: '',
    passcode: '',
    linkZoom: ''
  })
  const [err, setErr] = useState({
    zoomId: null,
    passcode: null,
    studentId: null,
    linkZoom: null,
    verified: null
  })
  const verifyRoom = (status) => {
    setVerifiedRoom(status)
  }
  const setErrorVerified = (errorState) => {
    setErr({ ...err, verified: errorState })
  }
  const handleClickCheck = (e) => {
    e.preventDefault()
    let studentId = ''
    if (client)
      studentId = client.email.split('@') ? client.email.split('@')[0] : ''

    dispatch(
      verifyZoomRoom(
        input.zoomId,
        input.passcode,
        input.linkZoom,
        studentId,
        verifyRoom,
        setErrorVerified
      )
    )
    if (verifiedRoom) {
      localStorage.setItem(
        'verifiedInfo',
        JSON.stringify({
          ...input,
          studentId: studentId,
          zoomEmail: client.email,
        })
      )
      setInput({ zoomId: '', passcode: '', linkZoom: '' })
      history.push('/verify/s2')
    }
  }
  // const handleClickVerify = (e) => {
  //   const classNames = e.currentTarget.getAttribute('class')
  //   if (classNames.includes('button-next')) {
  //     fetch(verifiedImage)
  //       .then((res) => res.blob())
  //       .then((blob) => {
  //         const file = new File([blob], 'face.jpg', { type: 'image/jpg' })
  //         let formData = new FormData()
  //         formData.append('file', file)
  //         formData.append('studentId', input.studentId)
  //         formData.append('zoomId', input.zoomId)
  //         formData.append('passcode', input.passcode)
  //         formData.append('linkZoom', input.linkZoom)

  //         axios
  //           .post(`${API_URL}/identity`, formData)
  //           .then((res) => {
  //             const identifiedRes = res.data
  //             //history.push(`/identity/result/${identifiedRes.id}`)
  //           })
  //           .catch((err) => {
  //             console.log('Fail to create new class')
  //           })
  //       })
  //   }

  //   e.preventDefault()
  // }
  const handleChange = (event) => {
    switch (event.target.name) {
      case 'zoomId':
        setInput({
          ...input,
          zoomId: event.target.value
        })
        break
      case 'passcode':
        setInput({
          ...input,
          passcode: event.target.value
        })
        break
      case 'linkZoom':
        setInput({
          ...input,
          linkZoom: event.target.value
        })
        break
      default:
        break
    }
  }
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  useEffect(() => {
    if (code) {
      axios
        .get(`${API_URL}/token/${code}`)
        .then((res) => {
          const { access_token } = res.data
          localStorage.setItem('accessToken', JSON.stringify(access_token))
          axios
            .post(`${API_URL}/profile`, {
              accessToken: access_token
            })
            .then((res) => {
              const data = res.data
              console.log('Client', data)
              localStorage.setItem('client', JSON.stringify(data))
            })
        })
        .catch((error) => console.log(error))
    }
  }, [code])
  return (
    <>
      <header className='sp-header'>
        <div className='sp-logo-wrap pull-left'>
          <a href='index.html'>
            <img
              className='brand-img mr-10'
              src='../img/logo.png'
              alt='brand'
            />
            <span className='brand-text'>Proctoring Zoom</span>
          </a>
        </div>
        <div className='clearfix' />
      </header>
      <div
        className='page-wrapper pa-0 ma-0 auth-page'
        style={{ minHeight: '420px' }}
      >
        <div className='container-fluid'>
          {/* Row */}
          <div
            className='table-struct full-width full-height'
            style={{ height: '420px' }}
          >
            <div className='table-cell vertical-align-middle auth-form-wrap'>
              <div className='auth-form  ml-auto mr-auto no-float'>
                <div className='row'>
                  <div className='col-sm-12 col-xs-12'>
                    <div className='mb-30'>
                      <h3 className='text-center txt-dark mb-10'>
                        Định danh thi online
                      </h3>
                      <h6 className='text-center nonecase-font txt-grey'>
                        Enter your details below
                      </h6>
                    </div>
                    <div className='form-wrap'>
                      <form action='#'>
                        <div className='form-group'>
                          <label
                            className='control-label mb-10'
                            htmlFor='exampleInputName_1'
                          >
                            Email Zoom
                          </label>
                          <input
                            type='text'
                            className='form-control'
                            id='exampleInputName_1'
                            disabled
                            value={client ? client.email : ''}
                          />
                        </div>
                        <div className='form-group'>
                          <label className='control-label mb-10'>
                            Họ và tên
                          </label>
                          <input
                            type='text'
                            className='form-control'
                            disabled
                            value={
                              client
                                ? client.first_name + ' ' + client.last_name
                                : ''
                            }
                          />
                        </div>
                        <div className='form-group'>
                          <label
                            className='pull-left control-label mb-10'
                            htmlFor='exampleInputpwd_2'
                          >
                            ZoomID
                          </label>
                          <input
                            type='text'
                            className='form-control'
                            id='exampleInputpwd_2'
                            placeholder='Nhập Id phòng Zoom'
                            name='zoomId'
                            onChange={handleChange}
                          />
                        </div>
                        <div className='form-group'>
                          <label
                            className='pull-left control-label mb-10'
                            htmlFor='exampleInputpwd_3'
                          >
                            Passcode
                          </label>
                          <input
                            type='text'
                            className='form-control'
                            id='exampleInputpwd_3'
                            name='passcode'
                            placeholder='Nhập passcode phòng zoom'
                            onChange={handleChange}
                          />
                        </div>
                        <h6>hoặc</h6>
                        <div className='form-group'>
                          <label
                            className='pull-left control-label mb-10'
                            htmlFor='exampleInputpwd_3'
                          >
                            Link phòng Zoom
                          </label>
                          <input
                            type='text'
                            className='form-control'
                            id='exampleInputpwd_3'
                            placeholder='Nhập link phòng Zoom'
                            name='linkZoom'
                            onChange={handleChange}
                          />
                          {err.verified && (
                            <div className='danger-block'>
                              Thông tin phòng Zoom không chính xác
                            </div>
                          )}
                        </div>
                        <div className='form-group text-center'>
                          <button
                            className='btn btn-success  btn-icon right-icon'
                            onClick={handleClickCheck}
                          >
                            <span>Tiếp tục</span>{' '}
                            <i className='fa fa-arrow-right' />{' '}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Row */}
        </div>
      </div>
    </>
  )
}

export default VerificationStep1
