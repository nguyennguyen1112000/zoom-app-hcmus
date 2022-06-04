import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Footer from '../../components/footer'
import { authHeader, getShortName } from '../../helper/utils'
import { updateProfile } from '../../actions/auth'
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
  console.log(user)
  const [errors, setErrors] = useState({
    moodleUsername: null,
    moodlePassword: null
  })
  function formatDate(date) {
    const newDate = new Date(date)
    const day = ('0' + newDate.getDate()).slice(-2)
    const month = ('0' + (newDate.getMonth() + 1)).slice(-2)
    const year = ('0' + newDate.getFullYear()).slice(-4)
    return `${year}-${month}-${day}`
  }
  useEffect(() => {
    if (user.role === 'student') {
      dispatch(getMyImages())
    }
  }, [dispatch, user])
  console.log('user', user)
  const [modeView, setMode] = useState('default')
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
      errs.moodleUsername = 'Không được để trống'
    }

    if (!input.moodlePassword) {
      isValid = false
      errs.moodlePassword = 'Không được để trống'
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
          toast.success('Kết nối thành công', {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })
          setErrors({ moodleUsername: null, moodlePassword: null })
          setMode('default')
        })
        .catch((err) => {
          toast.error(err.response?.data?.message, {
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

  function handleSubmit(event) {
    event.preventDefault()

    // if (validate()) {
    //   console.log("input", input);
    //   axios
    //     .patch(`${API_URL}/users`, input, authHeader())
    //     .then((res) => {
    //       toast.success("Cập nhật thành công!", {
    //         position: "top-right",
    //         autoClose: 1000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //       });
    //       const user = res.data;
    //       localStorage.setItem("user", JSON.stringify(user));
    //       const action = updateProfile(user);
    //       dispatch(action);
    //       setErrors({ firstName: null, lastName: null });
    //     })
    //     .catch((err) => {
    //       toast.error(err.response.data.message, {
    //         position: "top-right",
    //         autoClose: 2000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //       });
    //     });
    // }
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
                      {user?.first_name + ' ' + user?.last_name}
                    </h6>
                  </div>
                  <div className='social-info'>
                   {user.role ==="admin" && <button className='btn btn-primary btn-block mt-30'>
                      <i className='fa fa-connect' />
                      <span
                        className='btn-text'
                        onClick={() => setMode('connectMoodle')}
                      >
                        Link with Moodle account
                      </span>
                    </button>}
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
                          <ul
                            id='portfolio_1'
                            className='portf auto-construct  project-gallery'
                            data-col={4}
                            style={{
                              position: 'relative',
                              height: '479.124px'
                            }}
                          >
                            <li
                              className='item'
                              data-src='../img/gallery/equal-size/mock1.jpg'
                              data-sub-html='<h6>Bagwati</h6><p>Classic view from Rigwood Jetty on Coniston Water an old archive shot similar to an old post but a little later on.</p>'
                              style={{
                                width: '202px',
                                height: 'auto',
                                margin: '10px',
                                position: 'absolute',
                                left: '0px',
                                top: '0px'
                              }}
                            >
                              <a href='#'>
                                <img
                                  className='img-responsive'
                                  src='../img/gallery/equal-size/mock1.jpg'
                                  alt='Image description'
                                />
                                <span className='hover-cap'>Bagwati</span>
                              </a>
                            </li>
                            <li
                              className='item'
                              data-src='../img/gallery/equal-size/mock2.jpg'
                              data-sub-html='<h6>Not a Keyboard</h6><p>Classic view from Rigwood Jetty on Coniston Water an old archive shot similar to an old post but a little later on.</p>'
                              style={{
                                width: '202px',
                                height: 'auto',
                                margin: '10px',
                                position: 'absolute',
                                left: '222px',
                                top: '0px'
                              }}
                            >
                              <a href='#'>
                                <img
                                  className='img-responsive'
                                  src='../img/gallery/equal-size/mock2.jpg'
                                  alt='Image description'
                                />
                                <span className='hover-cap'>
                                  Not a Keyboard
                                </span>
                              </a>
                            </li>
                            <li
                              className='item'
                              data-src='../img/gallery/equal-size/mock3.jpg'
                              data-sub-html='<h6>Into the Woods</h6><p>Classic view from Rigwood Jetty on Coniston Water an old archive shot similar to an old post but a little later on.</p>'
                              style={{
                                width: '202px',
                                height: 'auto',
                                margin: '10px',
                                position: 'absolute',
                                left: '444px',
                                top: '0px'
                              }}
                            >
                              <a href='#'>
                                <img
                                  className='img-responsive'
                                  src='../img/gallery/equal-size/mock3.jpg'
                                  alt='Image description'
                                />
                                <span className='hover-cap'>
                                  Into the Woods
                                </span>
                              </a>
                            </li>
                            <li
                              className='item'
                              data-src='../img/gallery/equal-size/mock4.jpg'
                              data-sub-html='<h6>Ultra Saffire</h6><p>Classic view from Rigwood Jetty on Coniston Water an old archive shot similar to an old post but a little later on.</p>'
                              style={{
                                width: '202px',
                                height: 'auto',
                                margin: '10px',
                                position: 'absolute',
                                left: '666px',
                                top: '0px'
                              }}
                            >
                              <a href='#'>
                                <img
                                  className='img-responsive'
                                  src='../img/gallery/equal-size/mock4.jpg'
                                  alt='Image description'
                                />
                                <span className='hover-cap'>
                                  {' '}
                                  Ultra Saffire
                                </span>
                              </a>
                            </li>
                            <li
                              className='item'
                              data-src='../img/gallery/equal-size/mock5.jpg'
                              data-sub-html='<h6>Happy Puppy</h6><p>Classic view from Rigwood Jetty on Coniston Water an old archive shot similar to an old post but a little later on.</p>'
                              style={{
                                width: '202px',
                                height: 'auto',
                                margin: '10px',
                                position: 'absolute',
                                left: '0px',
                                top: '239px'
                              }}
                            >
                              <a href='#'>
                                <img
                                  className='img-responsive'
                                  src='../img/gallery/equal-size/mock5.jpg'
                                  alt='Image description'
                                />
                                <span className='hover-cap'>Happy Puppy</span>
                              </a>
                            </li>
                            <li
                              className='item'
                              data-src='../img/gallery/equal-size/mock6.jpg'
                              data-sub-html='<h6>Wooden Closet</h6><p>Classic view from Rigwood Jetty on Coniston Water an old archive shot similar to an old post but a little later on.</p>'
                              style={{
                                width: '202px',
                                height: 'auto',
                                margin: '10px',
                                position: 'absolute',
                                left: '222px',
                                top: '239px'
                              }}
                            >
                              <a href='#'>
                                <img
                                  className='img-responsive'
                                  src='../img/gallery/equal-size/mock6.jpg'
                                  alt='Image description'
                                />
                                <span className='hover-cap'>Wooden Closet</span>
                              </a>
                            </li>
                            <li
                              className='item'
                              data-src='../img/gallery/equal-size/mock7.jpg'
                              data-sub-html='<h6>Happy Puppy</h6><p>Classic view from Rigwood Jetty on Coniston Water an old archive shot similar to an old post but a little later on.</p>'
                              style={{
                                width: '202px',
                                height: 'auto',
                                margin: '10px',
                                position: 'absolute',
                                left: '444px',
                                top: '239px'
                              }}
                            >
                              <a href='#'>
                                <img
                                  className='img-responsive'
                                  src='../img/gallery/equal-size/mock7.jpg'
                                  alt='Image description'
                                />
                                <span className='hover-cap'>Happy Puppy</span>
                              </a>
                            </li>
                            <li
                              className='item'
                              data-src='../img/gallery/equal-size/mock8.jpg'
                              data-sub-html='<h6>Wooden Closet</h6><p>Classic view from Rigwood Jetty on Coniston Water an old archive shot similar to an old post but a little later on.</p>'
                              style={{
                                width: '202px',
                                height: 'auto',
                                margin: '10px',
                                position: 'absolute',
                                left: '666px',
                                top: '239px'
                              }}
                            >
                              <a href='#'>
                                <img
                                  className='img-responsive'
                                  src='../img/gallery/equal-size/mock8.jpg'
                                  alt='Image description'
                                />
                                <span className='hover-cap'>Wooden Closet</span>
                              </a>
                            </li>
                          </ul>
                        )}
                        {modeView === 'connectMoodle' && (
                          <div className='panel panel-default card-view'>
                            <div className='panel-heading'>
                              <div className='pull-left'>
                                <h6 className='panel-title txt-dark'>
                                  Kết nối tài khoản HCMUS Moodle
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
                                            Tên đăng nhập
                                          </label>
                                          <div className='input-group'>
                                            <div className='input-group-addon'>
                                              <i className='icon-user' />
                                            </div>
                                            <input
                                              type='text'
                                              className='form-control'
                                              id='exampleInputuname_1'
                                              placeholder='Nhập tên đăng nhập'
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
                                            Mật khẩu
                                          </label>
                                          <div className='input-group'>
                                            <div className='input-group-addon'>
                                              <i className='icon-lock' />
                                            </div>
                                            <input
                                              type='password'
                                              className='form-control'
                                              id='exampleInputpwd_1'
                                              placeholder='Nhập mật khẩu'
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
                                          Kiểm tra kết nối
                                        </button>
                                        <button
                                          type='submit'
                                          className='btn btn-default'
                                        >
                                          Thoát
                                        </button>
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
