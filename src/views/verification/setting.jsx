import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { authHeader } from '../../helper/utils'
import { getDefaultSetting } from '../../services/api/setting'
import socketIOClient from 'socket.io-client'
const API_URL = process.env.REACT_APP_API_URL

function Setting() {
  const socketRef = useRef()

  const setting = useSelector((state) => state.setting.setting)
  const [input, setInput] = useState({
    ekycUsername: '',
    ekycPassword: '',
    openCollectData: true,
    refreshToken: false,
    ekycToken: '',
    credibility: 0.7,
    maxFailAttempt: 3
  })
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDefaultSetting())
    if (setting) setInput(setting)
  }, [dispatch])
  useEffect(() => {
    if (setting) {
      const { ekycToken, ...result } = setting
      setInput(result)
    }
  }, [setting])
  useEffect(() => {
    socketRef.current = socketIOClient.connect(API_URL)
    return () => {
      socketRef.current.disconnect()
    }
  }, [])
  const sendNotification = (data) => {
    socketRef.current.emit('toServerCloseTerm', data)
  }
  const [errors, setErrors] = useState({
    ekycUsername: null,
    ekycPassword: null
  })
  function handleChange(event) {
    switch (event.target.name) {
      case 'ekycUsername':
        setInput({
          ...input,
          ekycUsername: event.target.value
        })
        break
      case 'credibility':
        setInput({
          ...input,
          credibility: event.target.value
        })
        break
      case 'ekycPassword':
        setInput({
          ...input,
          ekycPassword: event.target.value
        })
        break
      case 'refreshToken':
        setInput({
          ...input,
          refreshToken: event.target.checked
        })
        break
      case 'openCollectData':
        setInput({
          ...input,
          openCollectData: event.target.checked
        })
        break
      case 'maxFailAttempt':
        setInput({
          ...input,
          maxFailAttempt: event.target.value
        })
        break

      default:
        break
    }
  }
  function validate() {
    let isValid = true
    var errs = {}
    if (!input.ekycUsername) {
      isValid = false
      errs.ekycUsername = 'This field is required'
    }

    if (!input.ekycPassword) {
      isValid = false
      errs.ekycPassword = 'This field is required'
    }

    setErrors(errs)

    return isValid
  }
  function handleSubmit(event) {
    event.preventDefault()

    if (validate()) {
      axios
        .post(
          `${API_URL}/ekyc/login`,
          { username: input.ekycUsername, password: input.ekycPassword },
          authHeader()
        )
        .then((res) => {
          if (res.data.status === 'Login Failed') {
            setErrors({
              ekycUsername: 'Username or password is invalid',
              ekycPassword: 'Username or password is invalid'
            })
          } else {
            let newInput = { ...input }
            if (input.refreshToken) newInput.ekycToken = res.data.token
            axios
              .put(`${API_URL}/configuration`, newInput, authHeader())
              .then((res) => {
                setErrors({
                  ekycUsername: null,
                  ekycPassword: null
                })
                sendNotification(input.openCollectData)
                toast.success('Update setting successfully', {
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
                toast.success(err?.response?.data?.message, {
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
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <div className='container-fluid'>
      {/* Title */}
      <div className='row heading-bg'>
        <div className='col-lg-3 col-md-4 col-sm-4 col-xs-12'></div>
        {/* Breadcrumb */}
        <div className='col-lg-9 col-sm-8 col-md-8 col-xs-12'>
          <ol className='breadcrumb'>
            <li>
              <a href='index.html'>HCMUSID</a>
            </li>
            <li>
              <a href='#'>
                <span>Identity</span>
              </a>
            </li>
            <li className='active'>
              <span>setting</span>
            </li>
          </ol>
        </div>
        {/* /Breadcrumb */}
      </div>
      {/* /Title */}
      {/* Row */}
      <div className='row'>
        <div className='col-md-12'>
          <div className='panel panel-default card-view'>
            <div className='panel-heading'>
              <div className='pull-left'>
                <h6 className='panel-title txt-dark'>
                  Setting for EKYC API Account
                </h6>
              </div>
              <div className='clearfix' />
            </div>
            <div className='panel-wrapper collapse in'>
              <div className='panel-body'>
                <div className='row'>
                  <div className='col-sm-12 col-xs-12'>
                    <div className='form-wrap'>
                      <form>
                        <div
                          className={`form-group ${
                            errors.ekycUsername && 'has-error'
                          }`}
                        >
                          <label
                            className='control-label mb-10'
                            htmlFor='ekycUsername'
                          >
                            Ekyc username
                          </label>
                          <div className='input-group'>
                            <div className='input-group-addon'>
                              <i className='icon-user' />
                            </div>
                            <input
                              type='text'
                              className='form-control'
                              id='ekycUsername'
                              placeholder='Enter ekyc username account'
                              name='ekycUsername'
                              onChange={handleChange}
                              value={input.ekycUsername}
                            />
                          </div>
                          {errors.ekycUsername && (
                            <div className='help-block with-errors'>
                              {errors.ekycUsername}
                            </div>
                          )}
                        </div>

                        <div
                          className={`form-group ${
                            errors.ekycPassword && 'has-error'
                          }`}
                        >
                          <label
                            className='control-label mb-10'
                            htmlFor='ekycPassword'
                          >
                            Ekyc Password
                          </label>
                          <div className='input-group'>
                            <div className='input-group-addon'>
                              <i className='icon-lock' />
                            </div>
                            <input
                              type='password'
                              className='form-control'
                              id='ekycPassword'
                              placeholder='Enter ekyc password account'
                              name='ekycPassword'
                              onChange={handleChange}
                              value={input.ekycPassword}
                            />
                          </div>
                          {errors.ekycPassword && (
                            <div className='help-block with-errors'>
                              {errors.ekycPassword}
                            </div>
                          )}
                        </div>
                        <div
                          className='
                              form-group'
                        >
                          <label
                            className='control-label mb-10'
                            htmlFor='credibility'
                          >
                            Credibility
                          </label>
                          <div className='input-group'>
                            <div className='input-group-addon'>
                              <i className='fa fa-sliders' />
                            </div>
                            <input
                              type='number'
                              className='form-control'
                              id='credibility'
                              placeholder='Enter credibility of face recognition'
                              name='credibility'
                              onChange={handleChange}
                              value={input.credibility}
                              min={0}
                              max={1}
                              step={0.05}
                            />
                          </div>
                        </div>
                        <div
                          className='
                              form-group'
                        >
                          <label
                            className='control-label mb-10'
                            htmlFor='credibility'
                          >
                            Limit fail to identity
                          </label>
                          <div className='input-group'>
                            <div className='input-group-addon'>
                              <i className='fa fa-exclamation-triangle' />
                            </div>
                            <input
                              type='number'
                              className='form-control'
                              id='maxFailAttempt'
                              name='maxFailAttempt'
                              onChange={handleChange}
                              value={input.maxFailAttempt}
                              min={1}
                              max={10}
                              step={1}
                            />
                          </div>
                        </div>

                        <div className='form-group'>
                          <div className='checkbox checkbox-success'>
                            <input
                              id='openCollectData'
                              type='checkbox'
                              name='openCollectData'
                              onChange={handleChange}
                              checked={input.openCollectData}
                            />
                            <label htmlFor='refreshToken'>
                              Open collect data term
                            </label>
                          </div>
                        </div>

                        <div className='form-group'>
                          <div className='checkbox checkbox-success'>
                            <input
                              id='refreshToken'
                              type='checkbox'
                              name='refreshToken'
                              onChange={handleChange}
                              checked={input.refreshToken}
                            />
                            <label htmlFor='refreshToken'>
                              Refresh ekyc token api{' '}
                            </label>
                          </div>
                        </div>
                        <button
                          type='button'
                          className='btn btn-success mr-10'
                          onClick={handleSubmit}
                        >
                          Update
                        </button>
                        <a
                          href='/room'
                          type='button'
                          className='btn btn-default'
                        >
                          Cancel
                        </a>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Setting
