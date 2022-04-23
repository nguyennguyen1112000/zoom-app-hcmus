import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { userLoginSuccess } from '../../actions/auth'
import { useHistory } from 'react-router'
import { Link, useLocation } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
function SignUp() {
  const API_URL = process.env.REACT_APP_API_URL
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
  const [input, setInput] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState(null)
  const [redirect, setRedirect] = useState(false)
  const dispatch = useDispatch()
  let location = useLocation()
  let history = useHistory()
  const search = location.search
  const redirectTo = new URLSearchParams(search).get('redirectTo')

  const responseGoogle = (response) => {
    if (response.profileObj) {
      const { email, googleId, familyName, givenName, imageUrl } =
        response.profileObj
      const input = {
        email,
        googleId,
        firstName: familyName,
        lastName: givenName,
        imageUrl
      }
      axios
        .post(`${API_URL}/google`, input)
        .then((res) => {
          const { access_token, user } = res.data
          localStorage.setItem('user', JSON.stringify(user))
          localStorage.setItem('token', JSON.stringify(access_token))
          const action = userLoginSuccess(user)
          dispatch(action)
          setRedirect(true)
        })
        .catch((err) => {
          console.log('Error', err)
          setError(err.response.data.message)
        })
    }
  }

  function handleChange(event) {
    if (event.target.name === 'email') {
      setInput({
        ...input,
        email: event.target.value
      })
    } else {
      setInput({
        ...input,
        password: event.target.value
      })
    }
  }

  function handleSignUp(event) {
    event.preventDefault()    
    // if (input.email === '' && input.password === '') {
    //   setError('Vui lòng nhập email và password')
    //   return
    // }
    history.push('/500')
  }


  return (
    <>
      <div className="wrapper pa-0">
          <header className="sp-header">
            <div className="sp-logo-wrap pull-left">
              <a href="index.html">
                <img className="brand-img mr-10" src="../img/logo.png" alt="brand" />
                <span className="brand-text">Protoring Zoom</span>
              </a>
            </div>
            <div className="form-group mb-0 pull-right">
              <span className="inline-block pr-10">Already have an account?</span>
              <a className="inline-block btn btn-info btn-success btn-rounded btn-outline" href="login.html">Sign In</a>
            </div>
            <div className="clearfix" />
          </header>
          {/* Main Content */}
          <div className="page-wrapper pa-0 ma-0 auth-page">
            <div className="container-fluid">
              {/* Row */}
              <div className="table-struct full-width full-height">
                <div className="table-cell vertical-align-middle auth-form-wrap">
                  <div className="auth-form  ml-auto mr-auto no-float">
                    <div className="row">
                      <div className="col-sm-12 col-xs-12">
                        <div className="mb-30">
                          <h3 className="text-center txt-dark mb-10">Đăng ký tài khoản</h3>
                          <h6 className="text-center nonecase-font txt-grey">Nhập thông tin chi tiết bên dưới</h6>
                        </div>	
                        <div className="form-wrap">
                          <form action="#">
                            <div className="form-group">
                              <label className="control-label mb-10" htmlFor="exampleInputName_1">Tài khoản</label>
                              <input type="email" className="form-control" required id="exampleInputName_1" placeholder="Username" />
                            </div>
                            <div className="form-group">
                              <label className="control-label mb-10" htmlFor="exampleInputEmail_2">Địa chỉ email</label>
                              <input type="email" className="form-control" required id="exampleInputEmail_2" placeholder="Enter email" />
                            </div>
                            <div className="form-group">
                              <label className="pull-left control-label mb-10" htmlFor="exampleInputpwd_2">Mật khẩu</label>
                              <input type="password" className="form-control" required id="exampleInputpwd_2" placeholder="Enter pwd" />
                            </div>
                            <div className="form-group">
                              <label className="pull-left control-label mb-10" htmlFor="exampleInputpwd_3">Nhập lại mật khẩu</label>
                              <input type="password" className="form-control" required id="exampleInputpwd_3" placeholder="Enter pwd" />
                            </div>
                            <div className="form-group">
                              <div className="checkbox checkbox-primary pr-10 pull-left">
                                <input id="checkbox_2" required type="checkbox" />
                                <label htmlFor="checkbox_2"> Tôi đồng ý với các <span className="txt-primary">Điều khoản</span></label>
                              </div>
                              <div className="clearfix" />
                            </div>
                            
                            <div className="form-group text-center">
                              <button type="submit" className="btn btn-info btn-success btn-rounded" onClick={handleSignUp}>Sign Up</button>
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
          {/* /Main Content */}
        </div>
        </>
  )
}

export default SignUp
