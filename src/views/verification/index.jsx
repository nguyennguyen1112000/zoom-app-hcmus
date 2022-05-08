import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import { useHistory } from 'react-router-dom'
import { logOut } from '../../helper/utils'
import { verifyZoomRoom } from '../../services/api/client'
import { WebcamCapture } from '../webcam/WebcamCapture'
//import './css/style.css'

function VerificationClient() {
  const [webcamMode, setWebcamMode] = useState(false)
  const verifiedImage = useSelector((state) => state.client.image)
  const verifiedStudent = useSelector((state) => state.client.verifiedStudent)
  const [verifiedRoom, setVerifiedRoom] = useState(false)
  const dispatch = useDispatch()
  //const history = useHistory()
  const [input, setInput] = useState({
    zoomId: '',
    passcode: '',
    studentId: '',
    linkZoom: ''
  })
  const [err, setErr] = useState({
    zoomId: null,
    passcode: null,
    studentId: null,
    linkZoom: null
  })
  const verifyRoom = (status) => {
    setVerifiedRoom(status)
  }
  const handleClickNext = () => {
    dispatch(
      verifyZoomRoom(
        input.zoomId,
        input.passcode,
        input.linkZoom,
        input.studentId,
        verifyRoom
      )
    )
    if (verifiedRoom) setWebcamMode(true)
  }
  const handleClickPrevious = () => {
    setWebcamMode(false)
  }
  const handleClickVerify = (e) => {
    const classNames = e.currentTarget.getAttribute('class')
    if (classNames.includes('button-next')) {
      fetch(verifiedImage)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], 'face.jpg', { type: 'image/jpg' })
          let formData = new FormData()
          formData.append('file', file)
          formData.append('studentId', input.studentId)
          formData.append('zoomId', input.zoomId)
          formData.append('passcode', input.passcode)
          formData.append('linkZoom', input.linkZoom)
          const API_URL = process.env.REACT_APP_API_URL
          axios
            .post(`${API_URL}/identity`, formData)
            .then((res) => {
              const identifiedRes = res.data
              //history.push(`/identity/result/${identifiedRes.id}`)
            })
            .catch((err) => {
              console.log('Fail to create new class')
            })
        })
    }

    e.preventDefault()
  }

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
      case 'studentId':
        setInput({
          ...input,
          studentId: event.target.value
        })
        break
      default:
        break
    }
  }
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  useEffect(() => {
    const ZOOM_CLIENT_ID = process.env.REACT_APP_ZOOM_CLIENT_ID
    const ZOOM_CLIENT_SECRET = process.env.REACT_APP_ZOOM_CLIENT_SECRET
    if (code) {
      axios
        .get(`https://demo-zoom-api.herokuapp.com/token/${code}`)
        .then((res) => {
          const { access_token } = res.data
          localStorage.setItem('accessToken', JSON.stringify(access_token))
          console.log('access', access_token)
        })
        .catch((error) => console.log(error))
    }
  }, [code])
  return (
    <>
      <div className='steps-area steps-area-fixed'>
        <div className='image-holder'>
          <img src='assets/img/side-img.jpg' alt='' />
        </div>
        <div className='steps clearfix'>
          <ul className='tablist multisteps-form__progress'>
            <li className='multisteps-form__progress-btn js-active current'>
              <span>1</span>
            </li>
            <li className='multisteps-form__progress-btn'>
              <span>2</span>
            </li>
            <li className='multisteps-form__progress-btn'>
              <span>3</span>
            </li>
            <li className='multisteps-form__progress-btn last'>
              <span>4</span>
            </li>
          </ul>
        </div>
      </div>
      <form
        className='multisteps-form__form'
        action='#'
        id='wizard'
        method='POST'
      >
        <div className='form-area position-relative'>
          {/* div 2 */}
          <div
            className='multisteps-form__panel js-active'
            data-animation='slideHorz'
          >
            <div className='wizard-forms'>
              <div className='inner pb-100 clearfix'>
                <div className='form-content pera-content'>
                  <div className='step-inner-content'>
                    <span className='step-no bottom-line'>Bước 1</span>

                    <h2>Thông tin tài khoản</h2>
                    <p>Tên: Nguyễn Bình Nguyên</p>
                    <p>Email: 18120486@student.hcmus.edu.vn</p>
                  </div>
                  <a className='btn btn-danger btn-lg text-white'>
                    <i className='fa fa-sign-out'></i>ĐĂNG XUẤT
                  </a>
                </div>
              </div>
              {/* /.inner */}
              <div className='actions'>
                <ul>
                  <li>
                    <span className='js-btn-prev' title='BACK'>
                      <i className='fa fa-arrow-left' /> TRƯỚC{' '}
                    </span>
                  </li>
                  <li>
                    <span className='js-btn-next' title='NEXT'>
                      TIẾP TỤC <i className='fa fa-arrow-right' />
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* div 3 */}
          <div className='multisteps-form__panel' data-animation='slideHorz'>
            <div className='wizard-forms'>
              <div className='inner pb-100 clearfix'>
                <div className='form-content pera-content'>
                  <div className='step-inner-content'>
                    <span className='step-no bottom-line'>Bước 2</span>
                    <br />
                    <div className='step-progress float-right'>
                      <span>Hoàn thành 2/4 bước</span>
                      <div className='step-progress-bar'>
                        <div className='progress'>
                          <div
                            className='progress-bar'
                            style={{ width: '40%' }}
                          />
                        </div>
                      </div>
                    </div>
                    <h2>Thông tin Phòng Zoom</h2>

                    <div className='form-inner-area'>
                      <input
                        type='text'
                        name='zoomId'
                        className='form-control'
                        minLength={2}
                        placeholder='Mã phòng Zoom'
                        onChange={handleChange}
                      />
                      <input
                        type='password'
                        name='passcode'
                        className='form-control'
                        minLength={2}
                        placeholder='Passcode'
                        onChange={handleChange}
                      />
                      hoặc
                      <input
                        type='text'
                        name='linkZoom'
                        className='form-control'
                        placeholder='Link phòng'
                        onChange={handleChange}
                      />
                      <input
                        type='text'
                        name='studentId'
                        placeholder='MSSV *'
                        onChange={handleChange}
                      />
                      <input
                        type='text'
                        name='phone'
                        placeholder='Số điện thoại liên hệ'
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* ./inner */}
              <div className='actions'>
                <ul>
                  <li>
                    <span className='js-btn-prev' title='BACK'>
                      <i className='fa fa-arrow-left' /> TRƯỚC{' '}
                    </span>
                  </li>
                  <li>
                    <span
                      className={verifiedRoom ? 'js-btn-next' : 'button-next'}
                      title='NEXT'
                      onClick={handleClickNext}
                    >
                      TIẾP TỤC <i className='fa fa-arrow-right' />
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* div 4 */}
          <div className='multisteps-form__panel' data-animation='slideHorz'>
            <div className='wizard-forms'>
              <div className='inner pb-100 clearfix'>
                <div className='form-content pera-content'>
                  <div className='step-inner-content'>
                    <span className='step-no bottom-line'>Bước 3</span>
                    <br />
                    <div className='step-progress float-right'>
                      <span>Hoàn thành 3/4 bước</span>
                      <div className='step-progress-bar'>
                        <div className='progress'>
                          <div
                            className='progress-bar'
                            style={{ width: '70%' }}
                          />
                        </div>
                      </div>
                    </div>
                    <h2>Xác thực gương mặt</h2>

                    {/* <CaptureVideo /> */}
                    {webcamMode && <WebcamCapture />}
                  </div>
                </div>
              </div>
              {/* /.inner */}
              <div className='actions'>
                <ul>
                  <li>
                    <span
                      className='js-btn-prev'
                      title='BACK'
                      onClick={handleClickPrevious}
                    >
                      <i className='fa fa-arrow-left' /> TRƯỚC{' '}
                    </span>
                  </li>
                  <li>
                    <span
                      className={
                        verifiedImage
                          ? verifiedStudent
                            ? 'js-btn-next'
                            : 'button-next 123'
                          : 'button-disable'
                      }
                      title='NEXT'
                      onClick={handleClickVerify}
                    >
                      Xác thực <i className='fa fa-arrow-right' />
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* div 5 */}
          <div className='multisteps-form__panel' data-animation='slideHorz'>
            <div className='wizard-forms'>
              <div className='inner pb-100 clearfix'>
                <div className='form-content pera-content'>
                  <div className='step-inner-content'>
                    <span className='step-no bottom-line'>Bước 4</span>
                    <div className='step-progress float-right'>
                      <span>Hoàn thành điểm danh</span>
                      <div className='step-progress-bar'>
                        <div className='progress'>
                          <div
                            className='progress-bar'
                            style={{ width: '100%' }}
                          />
                        </div>
                      </div>
                    </div>
                    <h2>Complete Final Step</h2>
                    <p>
                      Tation argumentum et usu, dicit viderer evertitur te has.
                      Eu dictas concludaturque usu, facete detracto patrioque an
                      per, lucilius pertinacia eu vel.
                    </p>
                    <div className='step-content-field'>
                      <div className='date-picker date datepicker'>
                        <input
                          type='text'
                          name='date'
                          className='form-control'
                        />
                        <div className='input-group-append'>
                          <span>ADD TIME</span>
                        </div>
                      </div>
                      <div className='plan-area'>
                        <div className='plan-icon-text text-center active'>
                          <div className='plan-icon'>
                            <i className='fas fa-chess-queen' />
                          </div>
                          <div className='plan-text'>
                            <h3>Unlimited Plan</h3>
                            <p>
                              Tation argumentum et usu, dicit viderer evertitur
                              te has. Eu dictas concludaturque usu, dicit
                              viderer evertitur
                            </p>
                            <input
                              type='radio'
                              name='your_plan'
                              defaultValue='Unlimited Plan'
                              defaultChecked
                            />
                          </div>
                        </div>
                        <div className='plan-icon-text text-center'>
                          <div className='plan-icon'>
                            <i className='fas fa-cubes' />
                          </div>
                          <div className='plan-text'>
                            <h3>Limited Plan</h3>
                            <p>
                              Tation argumentum et usu, dicit viderer evertitur
                              te has. Eu dictas concludaturque usu, dicit
                              viderer evertitur
                            </p>
                            <input
                              type='radio'
                              name='your_plan'
                              defaultValue='Unlimited Plan'
                            />
                          </div>
                        </div>
                      </div>
                      <div className='budget-area'>
                        <p>Optimization and Accessibility</p>
                        <div className='opti-list'>
                          <ul className='d-flex'>
                            <li className='bg-white active'>
                              <input
                                type='checkbox'
                                name='code_opti1'
                                defaultValue='Semantic coding'
                                defaultChecked
                              />
                              Semantic coding
                            </li>
                            <li className='bg-white'>
                              <input
                                type='checkbox'
                                name='code_opti2'
                                defaultValue='Mobile APP'
                              />
                              Mobile APP
                            </li>
                            <li className='bg-white'>
                              <input
                                type='checkbox'
                                name='code_opti3'
                                defaultValue='Mobile Design'
                              />
                              Mobile Design
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className='comment-box'>
                        <textarea
                          name='extra-message'
                          placeholder='Some Note'
                          defaultValue={''}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /.inner */}
              <div className='actions'>
                <ul>
                  <li>
                    <span className='js-btn-prev' title='BACK'>
                      <i className='fa fa-arrow-left' /> BACK{' '}
                    </span>
                  </li>
                  <li>
                    <button type='submit' title='NEXT'>
                      SUBMIT <i className='fa fa-arrow-right' />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default VerificationClient
