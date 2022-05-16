import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { userLoginSuccess } from '../../actions/auth'
import { Redirect } from 'react-router-dom'

function Login() {
  const API_URL = process.env.REACT_APP_API_URL
  const CLIENT_ID = process.env.REACT_APP_ZOOM_CLIENT_ID
  const REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL

  const dispatch = useDispatch()

  const logIn = useSelector((state) => state.auth.isLoggedIn)
  const user = useSelector((state) => state.auth.currentUser)
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  const [redirect, setRedirect] = useState(false)
  useEffect(() => {
    console.log('code', code, logIn, user)
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: 'Bslzz4x0S1ycVG5L9KUXlw',
        first_name: 'Nguyễn Bình',
        last_name: 'Nguyên',
        email: '18120486@student.hcmus.edu.vn',
        type: 1,
        role_name: 'Owner',
        pmi: 7447313271,
        use_pmi: false,
        personal_meeting_url:
          'https://us05web.zoom.us/j/7447313271?pwd=TWw4V3pGVDJscEVBVVN3bkQ5d3NFZz09',
        timezone: 'Asia/Jakarta',
        verified: 1,
        dept: '',
        created_at: '2020-04-05T11:03:09Z',
        last_login_time: '2022-05-16T09:19:47Z',
        last_client_version: '5.9.3.3169(win)',
        host_key: '478688',
        cms_user_id: '',
        jid: 'bslzz4x0s1ycvg5l9kuxlw@xmpp.zoom.us',
        group_ids: [],
        im_group_ids: [],
        account_id: 'Jrm08XawRdiDsM22c9OT7Q',
        language: 'en-US',
        phone_number: '',
        status: 'active',
        job_title: '',
        location: '',
        login_types: [100],
        role_id: '0',
        account_number: 2601475324,
        cluster: 'us05',
        role: 'student',
        studentId: '18120486'
      })
    )
    localStorage.setItem(
      'token',
      JSON.stringify(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjE4MTIwNDg2QHN0dWRlbnQuaGNtdXMuZWR1LnZuIiwic3ViIjoiQnNseno0eDBTMXljVkc1TDlLVVhsdyIsInN0dWRlbnRJZCI6IjE4MTIwNDg2Iiwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE2NTI3MTMxMTQsImV4cCI6MTY1MjczMTExNH0.6eWvUkGNwlCTzapXGMLKLTSEB1chqNYugFHMrqwWaPI'
      )
    )
    if (code && !logIn) {
      const input = {
        code: code
      }
      axios
        .post(`${API_URL}/auth/login`, input)
        .then((res) => {
          setRedirect(true)
          const { access_token, user } = res.data
          localStorage.setItem('user', JSON.stringify(user))
          localStorage.setItem('token', JSON.stringify(access_token))
          const action = userLoginSuccess(user)
          dispatch(action)
        })
        .catch((err) => {
          console.log('Error', err)
        })
    }
  }, [code, logIn, redirect])
  console.log('redirect', redirect)

  if (redirect) return <Redirect to='/room' />
  return (
    <>
      <div>
        <div className='container' id='container'>
          <div className='form-container sign-in-container'>
            <div className='form'>
              <h4 className='mb-20'>Đăng nhập HCMUSID</h4>
              <a
                className='btn btn-primary btn-outline btn-block'
                href={`https://zoom.us/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URL}`}
              >
                Đăng nhập với Zoom
              </a>
              <button className='btn btn-primary  btn-block'>
                Đăng nhập với Moodle
              </button>
            </div>
          </div>
          <div className='overlay-container'>
            <div className='overlay'>
              <div className='overlay-panel overlay-right'>
                <img src='img/logo_signin.png' style={{ height: '250px' }} />
                <h6>Ứng dụng định danh thi trực tuyến qua ứng dụng Zoom</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            body {
	background: #f6f5f7;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	margin: -20px 0 50px;
}

h1 {
	font-weight: bold;
	margin: 0;
}

h2 {
	text-align: center;
}

p {
	font-size: 14px;
	font-weight: 100;
	line-height: 20px;
	letter-spacing: 0.5px;
	margin: 20px 0 30px;
}

span {
	font-size: 12px;
}

a {
	color: #333;
	font-size: 14px;
	text-decoration: none;
	margin: 15px 0;
}

button {
	border-radius: 20px;
	border: 1px solid #FF4B2B;
	background-color: #FF4B2B;
	color: #FFFFFF;
	font-size: 12px;
	font-weight: bold;
	padding: 12px 45px;
	letter-spacing: 1px;
	text-transform: uppercase;
	transition: transform 80ms ease-in;
}

button:active {
	transform: scale(0.95);
}

button:focus {
	outline: none;
}

button.ghost {
	background-color: transparent;
	border-color: #FFFFFF;
}

.form {
	background-color: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 50px;
	height: 100%;
	text-align: center;
}

input {
	background-color: #eee;
	border: none;
	padding: 12px 15px;
	margin: 8px 0;
	width: 100%;
}

.container {
	background-color: #fff;
	border-radius: 10px;
  	box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
			0 10px 10px rgba(0,0,0,0.22);
	position: relative;
	overflow: hidden;
	width: 768px;
	max-width: 100%;
	min-height: 480px;
}

.form-container {
	position: absolute;
	top: 0;
	height: 100%;
	transition: all 0.6s ease-in-out;
}

.sign-in-container {
	left: 0;
	width: 50%;
	z-index: 2;
}

.container.right-panel-active .sign-in-container {
	transform: translateX(100%);
}

.sign-up-container {
	left: 0;
	width: 50%;
	opacity: 0;
	z-index: 1;
}

.container.right-panel-active .sign-up-container {
	transform: translateX(100%);
	opacity: 1;
	z-index: 5;
	animation: show 0.6s;
}

@keyframes show {
	0%, 49.99% {
		opacity: 0;
		z-index: 1;
	}
	
	50%, 100% {
		opacity: 1;
		z-index: 5;
	}
}

.overlay-container {
	position: absolute;
	top: 0;
	left: 50%;
	width: 50%;
	height: 100%;
	overflow: hidden;
	transition: transform 0.6s ease-in-out;
	z-index: 100;
}

.container.right-panel-active .overlay-container{
	transform: translateX(-100%);
}

.overlay {
	background: #49f8f8;
	background: -webkit-linear-gradient(to right, #FF4B2B, #FFF);
	background: #E7EAEB;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 0 0;
	color: #FFFFFF;
	position: relative;
	left: -100%;
	height: 100%;
	width: 200%;
  	transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  	transform: translateX(50%);
}

.overlay-panel {
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 40px;
	text-align: center;
	top: 0;
	height: 100%;
	width: 50%;
	transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.overlay-left {
	transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
	transform: translateX(0);
}

.overlay-right {
	right: 0;
	transform: translateX(0);
}

.container.right-panel-active .overlay-right {
	transform: translateX(20%);
}

.social-container {
	margin: 20px 0;
}

.social-container a {
	border: 1px solid #DDDDDD;
	border-radius: 50%;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	margin: 0 5px;
	height: 40px;
	width: 40px;
}

footer {
    color: #fff;
    font-size: 14px;
    bottom: 0;
    position: fixed;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 999;
}

footer p {
    margin: 10px 0;
}

footer i {
    color: red;
}

footer a {
    color: #3c97bf;
    text-decoration: none;
}          `
        }}
      />
    </>
  )
}

export default Login
