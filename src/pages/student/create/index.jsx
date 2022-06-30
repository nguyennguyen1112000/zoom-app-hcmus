import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-date-picker'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { authHeader } from '../../../helper/utils'
function CreateStudent() {
  const API_URL = process.env.REACT_APP_API_URL
  const [input, setInput] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    gender: true,
    classCode: '',
    major: '',
    educationLevel: '',
    email: ''
  })
  const [birthday, setBirthday] = useState(new Date())

  const [errors, setErrors] = useState({
    studentId: null,
    firstName: null,
    lastName: null
  })
  const [searchStudent, setSearchStudent] = useState(null)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (input.studentId)
        axios
          .get(`${API_URL}/students/${input.studentId}`, authHeader())
          .then((res) => {
            setSearchStudent(res.data)
          })
          .catch((err) => {
            setSearchStudent(null)
            console.log(err)
          })
    }, 2000)

    return () => clearTimeout(delayDebounceFn)
  }, [input.studentId])
  function handleChange(event) {
    switch (event.target.name) {
      case 'studentId':
        if (event.target.value.length <= 20)
          setInput({
            ...input,
            studentId: event.target.value,
            email: `${event.target.value}@student.hcmus.edu.vn`
          })
        break
      case 'firstName':
        if (event.target.value.length <= 50)
          setInput({
            ...input,
            firstName: event.target.value
          })
        break
      case 'lastName':
        if (event.target.value.length <= 20)
          setInput({
            ...input,
            lastName: event.target.value
          })
        break
      case 'gender':
        setInput({
          ...input,
          gender: event.target.value
        })
        break
      case 'classCode':
        if (event.target.value.length <= 30)
          setInput({
            ...input,
            classCode: event.target.value
          })
        break
      case 'educationLevel':
        if (event.target.value.length <= 30)
          setInput({
            ...input,
            educationLevel: event.target.value
          })
        break
      case 'major':
        if (event.target.value.length <= 100)
          setInput({
            ...input,
            major: event.target.value
          })
        break

      default:
        break
    }
  }
  function validate() {
    let isValid = true
    var errs = {}
    if (!input.studentId) {
      isValid = false
      errs.studentId = 'This field is required'
    }
    if (input.studentId) {
      const reg = new RegExp('^[0-9]+$')
      if (!reg.test(input.studentId)) {
        isValid = false
        errs.studentId = 'Contain only number'
      }
    }
    if (!input.firstName) {
      isValid = false
      errs.firstName = 'This field is required'
    }
    if (!input.lastName) {
      isValid = false
      errs.lastName = 'This field is required'
    }
    if (searchStudent) {
      isValid = false
      errs.studentId = 'Student Id already exists'
    }

    setErrors(errs)

    return isValid
  }
  function handleSubmit(event) {
    event.preventDefault()
    console.log(searchStudent)
    if (validate()) {
      axios
        .post(`${API_URL}/students`, { ...input, birthday }, authHeader())
        .then((res) => {
          setInput({
            studentId: '',
            firstName: '',
            lastName: '',
            gender: true,
            classCode: '',
            major: '',
            educationLevel: '',
            email: ''
          })
          setBirthday(new Date())
          setSearchStudent(null)
          toast.success('Create student successfully', {
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
          toast.error(err?.response?.data?.message, {
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
  }

  return (
    <div className='container-fluid'>
      {/* Title */}
      <div className='row heading-bg'>
        <div className='col-lg-3 col-md-4 col-sm-4 col-xs-12'>
          <h5 className='txt-dark'>Student Form</h5>
        </div>
        {/* Breadcrumb */}
        <div className='col-lg-9 col-sm-8 col-md-8 col-xs-12'>
          <ol className='breadcrumb'>
            <li>
              <a href='/'>HCMUSID</a>
            </li>
            <li>
              <a href='/student'>Students</a>
            </li>
            <li className='active'>
              <span>Create new student</span>
            </li>
          </ol>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-12'>
          <div className='panel panel-default card-view'>
            <div className='panel-wrapper collapse in'>
              <div className='panel-body'>
                <div className='form-wrap'>
                  <form>
                    <div
                      className={`form-group ${
                        errors.studentId && 'has-error'
                      }`}
                    >
                      <label className='control-label mb-10 text-left'>
                        Student Id (*)
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        name='studentId'
                        onChange={handleChange}
                        value={input.studentId}
                        placeholder='Enter student id'
                      />
                      {errors.studentId && (
                        <div className='help-block with-errors'>
                          {errors.studentId}
                        </div>
                      )}
                    </div>
                    <div className='form-group'>
                      <label className='control-label mb-10 text-left'>
                        Email
                      </label>

                      <input
                        type='text'
                        className='form-control'
                        value={input.email}
                        disabled
                      />
                    </div>
                    <div
                      className={`form-group ${
                        errors.firstName && 'has-error'
                      }`}
                    >
                      <label className='control-label mb-10 text-left'>
                        First name (*)
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        name='firstName'
                        onChange={handleChange}
                        value={input.firstName}
                        placeholder={`Enter student's first name`}
                      />
                      {errors.firstName && (
                        <div className='help-block with-errors'>
                          {errors.firstName}
                        </div>
                      )}
                    </div>
                    <div
                      className={`form-group ${errors.lastName && 'has-error'}`}
                    >
                      <label className='control-label mb-10 text-left'>
                        Last name (*)
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        name='lastName'
                        onChange={handleChange}
                        value={input.lastName}
                        placeholder={`Enter student's last name`}
                      />
                      {errors.lastName && (
                        <div className='help-block with-errors'>
                          {errors.lastName}
                        </div>
                      )}
                    </div>
                    <div className='form-group'>
                      <label className='control-label mb-10'>Gender</label>
                      <select
                        className='form-control'
                        name='gender'
                        onChange={handleChange}
                      >
                        <option value="1">Male</option>
                        <option value="0">Female</option>
                      </select>
                    </div>
                    <div className='form-group'>
                      <label className='control-label mb-10'>Class code</label>
                      <input
                        className='form-control'
                        type='text'
                        name='classCode'
                        onChange={handleChange}
                        value={input.classCode}
                        placeholder='Enter class code'
                      />
                    </div>
                    <div className='form-group '>
                      <label className='control-label mb-10 text-left'>
                        Birthday
                      </label>
                      <DatePicker
                        className='form-control'
                        maxDate={new Date()}
                        value={birthday}
                        onChange={setBirthday}
                      />
                    </div>
                    <div className='form-group'>
                      <label className='control-label mb-10 text-left'>
                        Major
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        name='major'
                        onChange={handleChange}
                        value={input.major}
                        placeholder='Enter major'
                      />
                    </div>
                    <div className='form-group'>
                      <label className='control-label mb-10 text-left'>
                        Education level
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        name='educationLevel'
                        onChange={handleChange}
                        value={input.educationLevel}
                        placeholder='Enter education level'
                      />
                    </div>
                  </form>
                  <div className='form-actions mt-10'>
                    <button
                      className='btn btn-success  mr-10'
                      onClick={handleSubmit}
                    >
                      Save
                    </button>
                    <a href='/student' className='btn btn-default'>
                      Cancel
                    </a>
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

export default CreateStudent
