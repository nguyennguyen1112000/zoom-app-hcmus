import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Footer from '../../components/footer'
import { authHeader } from '../../helper/utils'
import { updateProfile } from '../../actions/auth'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getMyImages } from '../../services/api/image'

function Profile() {
  const user = useSelector((state) => state.auth.currentUser)
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    birthday: formatDate(user.birthday),
    sex: user.sex,
    studentId: user.studentId
  })
  console.log(user)
  const [errors, setErrors] = useState({
    firstName: null,
    lastName: null
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

  const imagesList = useSelector((state) => state.image.imageList)
  function handleChange(event) {
    switch (event.target.name) {
      case 'firstName':
        setInput({
          ...input,
          firstName: event.target.value
        })
        break
      case 'lastName':
        setInput({
          ...input,
          lastName: event.target.value
        })
        break
      case 'birthday':
        setInput({
          ...input,
          birthday: event.target.value
        })
        break
      case 'studentId':
        setInput({
          ...input,
          studentId: event.target.value
        })
        break

      default:
        setInput({
          ...input,
          sex: event.target.value === 'true'
        })

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
                      <span className='btn-text'>Chỉnh sửa</span>
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
                        BN{' '}
                      </div>
                      <div className='fileupload btn btn-default'>
                        <span className='btn-text'>Chỉnh sửa</span>
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
                    <button
                      className='btn btn-default btn-block btn-outline btn-anim mt-30'
                      data-toggle='modal'
                      data-target='#myModal'
                    >
                      <i className='fa fa-pencil' />
                      <span className='btn-text'>Chỉnh sửa profile</span>
                    </button>
                    <div
                      id='myModal'
                      className='modal fade in'
                      tabIndex={-1}
                      role='dialog'
                      aria-labelledby='myModalLabel'
                      aria-hidden='true'
                    >
                      <div className='modal-dialog'>
                        <div className='modal-content'>
                          <div className='modal-header'>
                            <button
                              type='button'
                              className='close'
                              data-dismiss='modal'
                              aria-hidden='true'
                            >
                              ×
                            </button>
                            <h5 className='modal-title' id='myModalLabel'>
                              Edit Profile
                            </h5>
                          </div>
                          <div className='modal-body'>
                            {/* Row */}
                            <div className='row'>
                              <div className='col-lg-12'>
                                <div className>
                                  <div className='panel-wrapper collapse in'>
                                    <div className='panel-body pa-0'>
                                      <div className='col-sm-12 col-xs-12'>
                                        <div className='form-wrap'>
                                          <form action='#'>
                                            <div className='form-body overflow-hide'>
                                              <div className='form-group'>
                                                <label
                                                  className='control-label mb-10'
                                                  htmlFor='exampleInputuname_1'
                                                >
                                                  Name
                                                </label>
                                                <div className='input-group'>
                                                  <div className='input-group-addon'>
                                                    <i className='icon-user' />
                                                  </div>
                                                  <input
                                                    type='text'
                                                    className='form-control'
                                                    id='exampleInputuname_1'
                                                    placeholder='willard bryant'
                                                  />
                                                </div>
                                              </div>
                                              <div className='form-group'>
                                                <label
                                                  className='control-label mb-10'
                                                  htmlFor='exampleInputEmail_1'
                                                >
                                                  Email address
                                                </label>
                                                <div className='input-group'>
                                                  <div className='input-group-addon'>
                                                    <i className='icon-envelope-open' />
                                                  </div>
                                                  <input
                                                    type='email'
                                                    className='form-control'
                                                    id='exampleInputEmail_1'
                                                    placeholder='xyz@gmail.com'
                                                  />
                                                </div>
                                              </div>
                                              <div className='form-group'>
                                                <label
                                                  className='control-label mb-10'
                                                  htmlFor='exampleInputContact_1'
                                                >
                                                  Contact number
                                                </label>
                                                <div className='input-group'>
                                                  <div className='input-group-addon'>
                                                    <i className='icon-phone' />
                                                  </div>
                                                  <input
                                                    type='email'
                                                    className='form-control'
                                                    id='exampleInputContact_1'
                                                    placeholder='+102 9388333'
                                                  />
                                                </div>
                                              </div>
                                              <div className='form-group'>
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
                                                    placeholder='Enter pwd'
                                                    defaultValue='password'
                                                  />
                                                </div>
                                              </div>
                                              <div className='form-group'>
                                                <label className='control-label mb-10'>
                                                  Gender
                                                </label>
                                                <div>
                                                  <div className='radio'>
                                                    <input
                                                      type='radio'
                                                      name='radio1'
                                                      id='radio_1'
                                                      defaultValue='option1'
                                                      defaultChecked
                                                    />
                                                    <label htmlFor='radio_1'>
                                                      M
                                                    </label>
                                                  </div>
                                                  <div className='radio'>
                                                    <input
                                                      type='radio'
                                                      name='radio1'
                                                      id='radio_2'
                                                      defaultValue='option2'
                                                    />
                                                    <label htmlFor='radio_2'>
                                                      F
                                                    </label>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className='form-group'>
                                                <label className='control-label mb-10'>
                                                  Country
                                                </label>
                                                <select
                                                  className='form-control'
                                                  data-placeholder='Choose a Category'
                                                  tabIndex={1}
                                                >
                                                  <option value='Category 1'>
                                                    USA
                                                  </option>
                                                  <option value='Category 2'>
                                                    Austrailia
                                                  </option>
                                                  <option value='Category 3'>
                                                    India
                                                  </option>
                                                  <option value='Category 4'>
                                                    UK
                                                  </option>
                                                </select>
                                              </div>
                                            </div>
                                            <div className='form-actions mt-10'>
                                              <button
                                                type='submit'
                                                className='btn btn-success mr-10 mb-30'
                                              >
                                                Update profile
                                              </button>
                                            </div>
                                          </form>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='modal-footer'>
                            <button
                              type='button'
                              className='btn btn-success waves-effect'
                              data-dismiss='modal'
                            >
                              Save
                            </button>
                            <button
                              type='button'
                              className='btn btn-default waves-effect'
                              data-dismiss='modal'
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                        {/* /.modal-content */}
                      </div>
                      {/* /.modal-dialog */}
                    </div>
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
                <div className='tab-struct custom-tab-1'>
                  <div className='tab-content' id='myTabContent_8'>
                    <div
                      id='photos_8'
                      className='tab-pane fade active in'
                      role='tabpanel'
                    >
                      <div className='col-md-12 pb-20'>
                        <div className='gallery-wrap'>
                          <div
                            className='portfolio-wrap project-gallery'
                            style={{ width: '891px' }}
                          >
                            <ul
                              id='portfolio_1'
                              className='portf auto-construct  project-gallery'
                              data-col={4}
                              style={{
                                position: 'relative',
                                height: '479.124px'
                              }}
                            >
                              {imagesList?.map((image, index) => (
                                <li
                                  key={index}
                                  className='item'
                                  data-src={image.fetchUrl}
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
                                  <a href={image.imageUrl}>
                                    <img
                                      className='img-responsive'
                                      src={image.fetchUrl}
                                      referrerpolicy='no-referrer'
                                    />
                                    <span className='hover-cap'>
                                      {image.originFileName}
                                    </span>
                                  </a>
                                </li>
                              ))}
                            </ul>
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
      </div>
    </div>
  )
}

export default Profile
