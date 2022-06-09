import axios from 'axios'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { authHeader } from '../../../helper/utils'
function CreateSubject() {
  const API_URL = process.env.REACT_APP_API_URL
  const [input, setInput] = useState({
    subjectCode: '',
    term: 1,
    teacher: '',
    classCode: '',
    studentYear: '',
    educationLevel: '',
    examCode: '',
    examTime: 0,
    name: '',
    schoolYear: '',
    examDate: new Date()
  })

  const [errors, setErrors] = useState({
    subjectCode: null,
    term: null,
    teacher: null,
    classCode: null,
    name: null,
    schoolYear: null
  })
  function handleChange(event) {
    switch (event.target.name) {
      case 'subjectCode':
        setInput({
          ...input,
          subjectCode: event.target.value
        })
        break
      case 'term':
        setInput({
          ...input,
          term: event.target.value
        })
        break
      case 'teacher':
        setInput({
          ...input,
          teacher: event.target.value
        })
        break
      case 'classCode':
        setInput({
          ...input,
          classCode: event.target.value
        })
        break
      case 'studentYear':
        setInput({
          ...input,
          studentYear: event.target.value
        })
        break
      case 'educationLevel':
        setInput({
          ...input,
          educationLevel: event.target.value
        })
        break
      case 'examCode':
        setInput({
          ...input,
          examCode: event.target.value
        })
        break
      case 'examTime':
        setInput({
          ...input,
          examTime: event.target.value
        })
        break
      case 'name':
        setInput({
          ...input,
          name: event.target.value
        })
        break
      case 'schoolYear':
        setInput({
          ...input,
          schoolYear: event.target.value
        })
        break
      default:
        break
    }
  }
  function validate() {
    let isValid = true
    var errs = {}
    if (!input.subjectCode) {
      isValid = false
      errs.subjectCode = 'This field is required'
    }
    if (input.subjectCode) {
      if (input.subjectCode.length > 20) {
        isValid = false
        errs.subjectCode = 'Phải ít hơn 20 kí tự'
      }
    }
    if (!input.teacher) {
      isValid = false
      errs.teacher = 'Không được để trống'
    }
    if (input.teacher) {
      if (input.teacher.length > 50) {
        isValid = false
        errs.teacher = 'Không được quá 50 kí tự'
      }
    }
    if (!input.classCode) {
      isValid = false
      errs.classCode = 'Không được để trống'
    }
    if (input.classCode) {
      if (input.classCode.length > 20) {
        isValid = false
        errs.classCode = 'Phải ít hơn 20 kí tự'
      }
    }

    if (!input.name) {
      isValid = false
      errs.name = 'Không được để trống'
    }
    if (input.name) {
      if (input.name.length > 100) {
        isValid = false
        errs.name = 'Phải ít hơn 100 kí tự'
      }
    }
    if (!input.schoolYear) {
      isValid = false
      errs.schoolYear = 'Không được để trống'
    }
    if (input.schoolYear) {
      if (input.schoolYear.length > 50) {
        isValid = false
        errs.schooYear = 'Phải ít hơn 50 kí tự'
      }
    }

    setErrors(errs)

    return isValid
  }
  function handleSubmit(event) {
    event.preventDefault()

    if (validate()) {
      axios
        .post(`${API_URL}/subjects`, input, authHeader())
        .then((res) => {
          setInput({
            subjectCode: '',
            term: 1,
            teacher: '',
            classCode: '',
            studentYear: '',
            educationLevel: '',
            examCode: '',
            examTime: 0,
            name: '',
            schoolYear: '',
            examDate: new Date()
          })
          toast.success('Created successfully', {
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
          <h5 className='txt-dark'>Subject form</h5>
        </div>
        {/* Breadcrumb */}
        <div className='col-lg-9 col-sm-8 col-md-8 col-xs-12'>
          <ol className='breadcrumb'>
            <li>
              <a href='/room'>HCMUSID</a>
            </li>
            <li>
              <a href='/subject'>Subjects</a>
            </li>
            <li className='active'>
              <span>Add new subject</span>
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
                    <div className={`form-group ${errors.name && 'has-error'}`}>
                      <label className='control-label mb-10 text-left'>
                        Name (*)
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        name='name'
                        onChange={handleChange}
                        value={input.name}
                        placeholder={`Enter subject's name`}
                      />
                      {errors.name && (
                        <div className='help-block with-errors'>
                          {errors.name}
                        </div>
                      )}
                    </div>
                    <div
                      className={`form-group ${
                        errors.subjectCode && 'has-error'
                      }`}
                    >
                      <label className='control-label mb-10 text-left'>
                        Subject code (*)
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        name='subjectCode'
                        onChange={handleChange}
                        value={input.subjectCode}
                        placeholder='Enter subject code'
                      />
                      {errors.subjectCode && (
                        <div className='help-block with-errors'>
                          {errors.subjectCode}
                        </div>
                      )}
                    </div>
                    <div
                      className={`form-group ${
                        errors.studentYear && 'has-error'
                      }`}
                    >
                      <label className='control-label mb-10 text-left'>
                        Student year
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        name='studentYear'
                        onChange={handleChange}
                        value={input.studentYear}
                        placeholder='Enter student year'
                      />
                      {errors.studentYear && (
                        <div className='help-block with-errors'>
                          {errors.studentYear}
                        </div>
                      )}
                    </div>
                    <div className='form-group'>
                      <label className='control-label mb-10'>Term</label>
                      <select
                        className='form-control'
                        data-placeholder='Choose a Category'
                        tabIndex={input.term}
                        name='term'
                        onChange={handleChange}
                      >
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                      </select>
                    </div>
                    <div
                      className={`form-group ${
                        errors.schoolYear && 'has-error'
                      }`}
                    >
                      <label className='control-label mb-10 text-left'>
                        School year
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        name='schoolYear'
                        onChange={handleChange}
                        value={input.schoolYear}
                        placeholder='Enter school year'
                      />
                      {errors.schoolYear && (
                        <div className='help-block with-errors'>
                          {errors.schoolYear}
                        </div>
                      )}
                    </div>
                    <div
                      className={`form-group ${
                        errors.classCode && 'has-error'
                      }`}
                    >
                      <label className='control-label mb-10 text-left'>
                        Class
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        name='classCode'
                        onChange={handleChange}
                        value={input.classCode}
                        placeholder='Enter class code'
                      />
                      {errors.classCode && (
                        <div className='help-block with-errors'>
                          {errors.classCode}
                        </div>
                      )}
                    </div>
                    <div className='form-group'>
                      <label className='control-label mb-10 text-left'>
                        Exam code
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        name='examCode'
                        onChange={handleChange}
                        value={input.examCode}
                        placeholder='Enter exam code'
                      />
                    </div>

                    <div
                      className={`form-group ${errors.teacher && 'has-error'}`}
                    >
                      <label className='control-label mb-10 text-left'>
                        Teacher
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        name='teacher'
                        onChange={handleChange}
                        value={input.teacher}
                        placeholder={`Enter teacher's name`}
                      />
                    </div>
                    <div className='form-group'>
                      <label className='control-label mb-10 text-left'>
                        Class type
                        <span className='help'> (Example: ĐHCQ, CLC)</span>
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        name='educationLevel'
                        onChange={handleChange}
                        value={input.educationLevel}
                        placeholder='Enter class type'
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
                    <a href='/subject' className='btn btn-default'>
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

export default CreateSubject
