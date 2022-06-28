/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { userLoginSuccess } from '../../actions/auth'
import { Redirect } from 'react-router-dom'
import zoomSdk from '@zoom/appssdk'
import { SpinnerCircularFixed } from 'spinners-react'
function Home() {
  const API_URL = process.env.REACT_APP_API_URL
  const dispatch = useDispatch()

  const logIn = useSelector((state) => state.auth.isLoggedIn)
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  const [redirect, setRedirect] = useState(false)
  const [input, setInput] = useState({
    username: '',
    password: ''
  })
  const [moodleLogin, setMoodleLogin] = useState(false)
  const [errors, setErrors] = useState({
    username: null,
    password: null,
    invalidAccount: null
  })
  const [counter, setCounter] = useState(0)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    async function configureSdk() {
      // to account for the 2 hour timeout for config
      const configTimer = setTimeout(() => {
        setCounter(counter + 1)
      }, 120 * 60 * 1000)

      try {
        // Configure the JS SDK, required to call JS APIs in the Zoom App
        // These items must be selected in the Features -> Zoom App SDK -> Add APIs tool in Marketplace
        const configResponse = await zoomSdk.config({
          capabilities: [
            'getMeetingContext',
            'getSupportedJsApis',
            'showNotification',
            'openUrl',
            'authorize',
            'onAuthorized'
          ],
          version: '0.16.0'
        })
        console.log('App configured', configResponse)
        localStorage.setItem('isEmbedded', 'true')
      } catch (error) {
        console.log(error)
      }
      return () => {
        clearTimeout(configTimer)
      }
    }
    configureSdk()
  }, [counter])
  const authorize = async () => {
    console.log('Authorize flow begins here')
    console.log('1. Get code challenge and state from backend . . .')
    const resp = await fetch(`${API_URL}/zooms/authorize`)
      .then((r) => r.json())
      .catch((e) => {
        console.log(e)
      })

    if (!resp || !resp.codeChallenge) {
      console.log(
        'Error in the authorize flow - likely an outdated user session.  Please refresh the app'
      )
      return
    }

    const { codeChallenge, state } = resp

    console.log('1a. Code challenge from backend: ', codeChallenge)
    console.log('1b. State from backend: ', state)

    const authorizeOptions = {
      codeChallenge: codeChallenge,
      state: state
    }
    localStorage.setItem('codeVerifier', codeChallenge)

    console.log(
      '2. Invoke authorize, eg zoomSdk.callZoomApi("authorize", authorizeOptions)'
    )
    zoomSdk
      .callZoomApi('authorize', authorizeOptions)
      .then((response) => {
        console.log('Response', response)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  function handleChange(event) {
    switch (event.target.name) {
      case 'username':
        if (event.target.value.length <= 20)
          setInput({
            ...input,
            username: event.target.value
          })
        break
      case 'password':
        setInput({
          ...input,
          password: event.target.value
        })
        break

      default:
        break
    }
  }
  function validate() {
    let isValid = true
    var errs = {}
    if (!input.username) {
      isValid = false
      errs.username = 'This field is required'
    }

    if (!input.password) {
      isValid = false
      errs.password = 'This field is required'
    }
    setErrors(errs)
    return isValid
  }
  function handleLoginMoodle(event) {
    event.preventDefault()
    if (validate()) {
      axios
        .post(`${API_URL}/auth/login/moodle`, input)
        .then((res) => {
          setInput({
            username: '',
            password: ''
          })
          setErrors({ username: null, password: null })
          const { access_token, user } = res.data
          localStorage.setItem('user', JSON.stringify(user))
          localStorage.setItem('token', JSON.stringify(access_token))
          const action = userLoginSuccess(user)
          dispatch(action)
          setRedirect(true)
        })
        .catch((err) => {
          setErrors({
            ...errors,
            invalidAccount: 'Invalid username or password'
          })
        })
    }
  }
  useEffect(() => {
    if (code && !logIn) {
      const input = {
        code: code
      }
      axios
        .post(`${API_URL}/auth/login`, input)
        .then((res) => {
          const { access_token, user } = res.data
          localStorage.setItem('user', JSON.stringify(user))
          localStorage.setItem('token', JSON.stringify(access_token))
          const action = userLoginSuccess(user)
          dispatch(action)
          setRedirect(true)
        })
        .catch((err) => {
          // eslint-disable-next-line no-undef
          if (err?.response?.status === 401)
            swal(
              'Your account doest not exist. Please contact your system administrator',
              {
                buttons: false,
                timer: 5000
              }
            )
        })
    }
  }, [code, logIn, redirect])
  useEffect(() => {
    // this is not the best way to make sure > 1 instances are not registered
    console.log('In-Client OAuth flow: onAuthorized event listener added')
    zoomSdk.addEventListener('onAuthorized', (event) => {
      const { code } = event
      console.log('event', event)
      console.log('3. onAuthorized event fired.')
      console.log(
        '3a. Here is the event passed to event listener callback, with code and state: ',
        event
      )
      console.log(
        '4. POST the code, state to backend to exchange server-side for a token.  Refer to backend logs now . . .'
      )
      setLoading(false)
      axios
        .post(`${API_URL}/zooms/onauthorized`, {
          code,
          codeVerifier: localStorage.getItem('codeVerifier'),
          href: window.location.href
        })
        .then((res) => {
          localStorage.setItem('codeVerifier', null)
          const { access_token, user } = res.data
          localStorage.setItem('user', JSON.stringify(user))
          localStorage.setItem('token', JSON.stringify(access_token))
          const action = userLoginSuccess(user)
          dispatch(action)
          setRedirect(true)
          console.log(
            '4. Backend returns succesfully after exchanging code for auth token.  Go ahead and update the UI'
          )
          setLoading(true)
        })
        .catch((err) => console.log(err.message))
    })
  }, [])
  if (redirect) return <Redirect to='/room' />
  return (
    <>
      <div>
        <div className='container' id='container'>
          <div className='form-container sign-in-container'>
            <div className='form'>
              <h4 className='mb-20' style={{ color: 'Highlight' }}>
                Sign in HCMUSID
              </h4>
              <button className='btn btn-primary btn-block' onClick={authorize}>
                <i className='fa fa-video-camera'></i> Sign in with Zoom
              </button>

              <button
                className='btn btn-default btn-block'
                onClick={() => setMoodleLogin(true)}
              >
                Sign in with FIT Moodle
              </button>
              {moodleLogin && (
                <>
                  <input
                    type='text'
                    className={`form-control ${
                      errors.username && 'input-error'
                    }`}
                    placeholder='Enter username'
                    name='username'
                    value={input.username}
                    onChange={handleChange}
                  />

                  <input
                    type='password'
                    className={`form-control ${
                      errors.username && 'input-error'
                    }`}
                    placeholder='Enter password'
                    name='password'
                    value={input.password}
                    onChange={handleChange}
                  />
                  {errors.invalidAccount && (
                    <span
                      className='help-block with-errors'
                      style={{ color: 'red' }}
                    >
                      {errors.invalidAccount}
                    </span>
                  )}
                  <button
                    className='btn btn-danger'
                    onClick={handleLoginMoodle}
                  >
                    Sign in <i className='fa fa-arrow-right'></i>
                  </button>
                </>
              )}
            </div>
          </div>
          <div className='overlay-container'>
            <div className='overlay'>
              <div className='overlay-panel overlay-right'>
                <img src='img/logo_signin.png' style={{ height: '250px' }} />
                <h6>
                  Solution for remote exams held on Zoom platform, quickly
                  verifying the identity of exam-takers
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className='spinner-loading'>
          <SpinnerCircularFixed
            size={100}
            thickness={100}
            color='#2986CC'
            enabled={loading}
          />
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

export default Home
