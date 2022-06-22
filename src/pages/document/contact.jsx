import axios from 'axios'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import { authHeader } from '../../helper/utils'

function Contact() {
  const API_URL = process.env.REACT_APP_API_URL
  const [input, setInput] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [errors, setErrors] = useState({
    name: null,
    email: null,
    message: null
  })

  function handleChange(event) {
    switch (event.target.name) {
      case 'name':
        if (event.target.value.length <= 50)
          setInput({
            ...input,
            name: event.target.value
          })
        break
      case 'email':
        if (event.target.value.length <= 150)
          setInput({
            ...input,
            email: event.target.value
          })
        break
      case 'message':
        if (event.target.value.length <= 1000)
          setInput({
            ...input,
            message: event.target.value
          })
        break
      default:
        break
    }
  }
  function validate() {
    let isValid = true
    var errs = {}
    if (!input.name) {
      isValid = false
      errs.name = 'Name is required'
    }
    if (!input.email) {
      isValid = false
      errs.email = 'Email is required'
    }
    if (input.email) {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      )
      if (!pattern.test(input['email'])) {
        isValid = false
        errs.email = 'Invalid email address'
      }
    }
    if (!input.message) {
      isValid = false
      errs.message = 'Please enter your message'
    }
    setErrors(errs)
    return isValid
  }
  function handleSubmit(event) {
    event.preventDefault()
    if (validate()) {
      axios
        .post(`${API_URL}/contact`, input, authHeader())
        .then((res) => {
          setInput({
            name: '',
            email: '',
            message: ''
          })
          setErrors({
            name: null,
            email: null,
            message: null
          })
          swal('Thank you for getting in touch!', {
            buttons: false,
            timer: 5000
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <div className='wrapper pa-0'>
      <header className='sp-header'>
        <div className='sp-logo-wrap pull-left'>
          <a href='/'>
            <img
              className='brand-img mr-10'
              src='../img/logo.png'
              alt='brand'
            />
            <span className='brand-text'>HCMUSID</span>
          </a>
        </div>

        <div className='clearfix' />
      </header>
      {/* Main Content */}
      <div
        className='page-wrapper pa-0 ma-0 auth-page'
        style={{ minHeight: '722px' }}
      >
        <div className='container-fluid'>
          {/* Row */}
          <div
            className='table-struct full-width full-height'
            style={{ height: '722px' }}
          >
            <div className='table-cell vertical-align-middle auth-form-wrap'>
              <div className='auth-form  ml-auto mr-auto no-float'>
                <div className='row'>
                  <div className='col-sm-12 col-xs-12'>
                    <div className='mb-30'>
                      <h3 className='text-center txt-dark mb-10'>Contact us</h3>
                      <h6 className='text-center nonecase-font txt-grey'>
                        Please send your message below. We will get back to you
                        at the earliest!!
                      </h6>
                    </div>
                    <div className='form-wrap'>
                      <form action='#'>
                        <div className='form-body overflow-hide'>
                          <div
                            className={`form-group ${
                              errors.name && 'has-error'
                            }`}
                          >
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
                                id='name'
                                placeholder='Enter your name'
                                name='name'
                                value={input.name}
                                onChange={handleChange}
                              />
                            </div>
                            {errors.name && (
                              <div className='help-block with-errors'>
                                {errors.name}
                              </div>
                            )}
                          </div>
                          <div
                            className={`form-group ${
                              errors.email && 'has-error'
                            }`}
                          >
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
                                id='email'
                                placeholder='youremail@gmail.com'
                                name='email'
                                value={input.email}
                                onChange={handleChange}
                              />
                            </div>
                            {errors.email && (
                              <div className='help-block with-errors'>
                                {errors.email}
                              </div>
                            )}
                          </div>

                          <div
                            className={`form-group ${
                              errors.message && 'has-error'
                            }`}
                          >
                            <label className='control-label mb-10 text-left'>
                              Message
                            </label>
                            <textarea
                              className='form-control'
                              rows={5}
                              value={input.message}
                              name='message'
                              onChange={handleChange}
                            />
                          </div>
                          {errors.message && (
                            <div className='help-block with-errors'>
                              {errors.message}
                            </div>
                          )}
                        </div>
                        <div className='form-actions mt-10'>
                          <button
                            className='btn btn-success mr-10 mb-30'
                            onClick={handleSubmit}
                          >
                            Send message
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
      {/* /Main Content */}
    </div>
  )
}

export default Contact
