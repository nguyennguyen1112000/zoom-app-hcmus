import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { authHeader, getShortName } from '../../helper/utils'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getMyImages } from '../../services/api/image'
const API_URL = process.env.REACT_APP_API_URL

function Profile() {
  const user = useSelector((state) => state.auth.currentUser)
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    moodleUsername: '',
    moodlePassword: ''
  })
  const [errors, setErrors] = useState({
    moodleUsername: null,
    moodlePassword: null
  })

  useEffect(() => {
    if (user.role === 'student') {
      dispatch(getMyImages())
    }
  }, [dispatch, user])
  console.log('user', user)
  const [modeView, setMode] = useState('connectMoodle')
  const imagesList = useSelector((state) => state.image.imageList)
  function handleChange(event) {
    switch (event.target.name) {
      case 'moodleUsername':
        setInput({
          ...input,
          moodleUsername: event.target.value
        })
        break
      case 'moodlePassword':
        setInput({
          ...input,
          moodlePassword: event.target.value
        })
        break

      default:
        break
    }
  }
  function validate() {
    let isValid = true
    var errs = {}
    if (!input.firstName) {
      isValid = false
      errs.firstName = 'Họ và tên lót không được để trống'
    }

    if (input.firstName.length > 64) {
      isValid = false
      errs.firstName = 'Nhập tối đa 64 kí tự'
    }

    if (!input.lastName) {
      isValid = false
      errs.lastName = 'Tên không được để trống'
    }

    if (input.firstName.length > 64) {
      isValid = false
      errs.lastName = 'Nhập tối đa 64 kí tự'
    }

    setErrors(errs)

    return isValid
  }
  function validateConnectForm() {
    let isValid = true
    var errs = {}
    if (!input.moodleUsername) {
      isValid = false
      errs.moodleUsername = 'Username is required'
    }

    if (!input.moodlePassword) {
      isValid = false
      errs.moodlePassword = 'Password is required'
    }
    setErrors(errs)

    return isValid
  }
  const handleConnectMoodle = (e) => {
    e.preventDefault()
    if (validateConnectForm())
      axios
        .post(
          `${API_URL}/moodles/connect`,
          {
            moodleUsername: input.moodleUsername,
            moodlePassword: input.moodlePassword
          },
          authHeader()
        )
        .then((res) => {
          toast.success('Connect successfully', {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })
          setErrors({ moodleUsername: null, moodlePassword: null })
          //setMode('default')
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })
        })
  }


  return (
    <div className='container-fluid pt-25'>
      {/* Row */}
      <div className='row'>
        <div className='col-lg-3 col-xs-12'>
          <div className='panel panel-default card-view  pa-0'>
            <div className='panel-wrapper collapse in'>
              <div className='panel-body  pa-0'>
                <div className='profile-box'>
                  <div className='profile-cover-pic'>
                    <div className='fileupload btn btn-default'>
                      <span className='btn-text'>Edit</span>
                      <input className='upload' type='file' />
                    </div>
                    <div className='profile-image-overlay' />
                  </div>
                  <div className='profile-info text-center'>
                    <div className='profile-img-wrap'>
                      <div
                        className='inline-block mb-10'
                        style={{
                          'font-size': '100px',
                          background: '#c4341a',
                          color: 'white'
                        }}
                      >
                        {getShortName(user?.firstName + ' ' + user?.lastName)}
                      </div>
                      <div className='fileupload btn btn-default'>
                        <span className='btn-text'>Edit</span>
                        <input className='upload' type='file' />
                      </div>
                    </div>
                    <h5 className='block mt-10 mb-5 weight-500 capitalize-font txt-danger'>
                      {user?.studentId}
                    </h5>
                    <h6 className='block capitalize-font pb-20'>
                      {user?.firstName + ' ' + user?.lastName}
                    </h6>
                  </div>
                  <div className='social-info'>
                    {user.role === 'admin' && (
                      <button className='btn btn-primary btn-block mt-30'>
                        <i className='fa fa-connect' />
                        <span
                          className='btn-text'
                          onClick={() => setMode('connectMoodle')}
                        >
                          Connect Moodle account
                        </span>
                      </button>
                    )}
                    <button
                      className='btn btn-default btn-block btn-outline btn-anim'
                      data-toggle='modal'
                      data-target='#myModal'
                    >
                      <i className='fa fa-pencil' />
                      <span className='btn-text'>Edit profile</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-9 col-xs-12'>
          <div className='panel panel-default card-view pa-0'>
            <div className='panel-wrapper collapse in'>
              <div className='panel-body pb-0'>
                <div className='tab-pane fade active in' role='tabpanel'>
                  <div className='col-md-12 pb-20'>
                    <div className='gallery-wrap'>
                      <div
                        className='portfolio-wrap project-gallery'
                        style={{ width: '891px' }}
                      >
                        {modeView === 'default' && (
                          <div className='panel panel-default card-view'>
                            <div className='panel-heading'>
                              <div className='pull-left'>
                                <h6 className='panel-title txt-dark'>
                                  Bootstrap carousel without caption
                                </h6>
                              </div>
                              <div className='clearfix' />
                            </div>
                            <div className='panel-wrapper collapse in'>
                              <div className='panel-body'>
                                {/* START carousel*/}
                                <div
                                  id='carousel-example-captions-1'
                                  data-ride='carousel'
                                  className='carousel slide'
                                >
                                  <ol className='carousel-indicators'>
                                    <li
                                      data-target='#carousel-example-captions-1'
                                      data-slide-to={0}
                                      className
                                    />
                                    <li
                                      data-target='#carousel-example-captions-1'
                                      data-slide-to={1}
                                      className='active'
                                    />
                                    <li
                                      data-target='#carousel-example-captions-1'
                                      data-slide-to={2}
                                      className
                                    />
                                  </ol>
                                  <div
                                    role='listbox'
                                    className='carousel-inner'
                                  >
                                    <div className='item'>
                                      {' '}
                                      <img
                                        src='../img/big/img4.jpg'
                                        alt='First slide image'
                                      />{' '}
                                    </div>
                                    <div className='item active'>
                                      {' '}
                                      <img
                                        src='../img/big/img5.jpg'
                                        alt='Second slide image'
                                      />{' '}
                                    </div>
                                    <div className='item'>
                                      {' '}
                                      <img
                                        src='../img/big/img6.jpg'
                                        alt='Third slide image'
                                      />{' '}
                                    </div>
                                  </div>
                                </div>
                                {/* END carousel*/}
                              </div>
                            </div>
                          </div>
                        )}
                        {modeView === 'connectMoodle' && (
                          <div className='panel panel-default card-view'>
                            <div className='panel-heading'>
                              <div className='pull-left'>
                                <h6 className='panel-title txt-dark'>
                                  Connect to FIT Moodle
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
                                            errors.moodleUsername && 'has-error'
                                          }`}
                                        >
                                          <label
                                            className='control-label mb-10'
                                            htmlFor='exampleInputuname_1'
                                          >
                                            Username
                                          </label>
                                          <div className='input-group'>
                                            <div className='input-group-addon'>
                                              <i className='icon-user' />
                                            </div>
                                            <input
                                              type='text'
                                              className='form-control'
                                              id='exampleInputuname_1'
                                              placeholder={`Enter your Moodle's username`}
                                              name='moodleUsername'
                                              onChange={handleChange}
                                            />
                                          </div>
                                          {errors.moodleUsername && (
                                            <div className='help-block with-errors'>
                                              {errors.moodleUsername}
                                            </div>
                                          )}
                                        </div>

                                        <div
                                          className={`form-group ${
                                            errors.moodlePassword && 'has-error'
                                          }`}
                                        >
                                          <label
                                            className='control-label mb-10'
                                            htmlFor='exampleInputpwd_1'
                                          >
                                           Password
                                          </label>
                                          <div className='input-group'>
                                            <div className='input-group-addon'>
                                              <i className='icon-lock' />
                                            </div>
                                            <input
                                              type='password'
                                              className='form-control'
                                              id='exampleInputpwd_1'
                                              placeholder={`Enter your Moodle's password`}
                                              name='moodlePassword'
                                              onChange={handleChange}
                                            />
                                          </div>
                                          {errors.moodlePassword && (
                                            <div className='help-block with-errors'>
                                              {errors.moodlePassword}
                                            </div>
                                          )}
                                        </div>

                                        <button
                                          className='btn btn-success mr-10'
                                          onClick={handleConnectMoodle}
                                        >
                                          Connect
                                        </button>
                                        {/* <button
                                          type='submit'
                                          className='btn btn-default'
                                        >
                                          
                                        </button> */}
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
