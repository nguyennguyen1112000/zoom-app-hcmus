import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { authHeader } from '../../../helper/utils'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useLocation, Redirect } from 'react-router-dom'
import { getCurrentSubject } from '../../../services/api/subject'
function EditSubject() {
  const API_URL = process.env.REACT_APP_API_URL
  const dispatch = useDispatch()
  let { id } = useParams()
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
    numGroups: 1
  })
  const currentSubject = useSelector((state) => state.subject.currentSubject)
  const { search } = useLocation()
  const redirectTo = new URLSearchParams(search).get('redirectTo')
  const [redirect, setRedirect] = useState(false)
  //const [startTime, onChangeTime] = useState('10:00')
  //const [examDate, setExamDate] = useState(new Date())
  useEffect(() => {
    if (id) dispatch(getCurrentSubject(id))
  }, [dispatch])
  useEffect(() => {
    if (currentSubject) {
      setInput({ ...input, ...currentSubject })
      //setExamDate(currentSubject.examDate)
      //onChangeTime(currentSubject.startTime)
    }
  }, [currentSubject])
  const [errors, setErrors] = useState({
    subjectCode: null,
    term: null,
    teacher: null,
    classCode: null,
    examTime: null,
    name: null,
    schoolYear: null,
    examDate: null,
    startTime: null
  })
  function handleChange(event) {
    switch (event.target.name) {
      case 'subjectCode':
        if (event.target.value.length < 20)
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
        if (event.target.value.length < 100)
          setInput({
            ...input,
            teacher: event.target.value
          })
        break
      case 'classCode':
        if (event.target.value.length < 20)
          setInput({
            ...input,
            classCode: event.target.value
          })
        break
      case 'studentYear':
        if (event.target.value.length < 4)
          setInput({
            ...input,
            studentYear: event.target.value
          })
        break
      case 'educationLevel':
        if (event.target.value.length < 20)
          setInput({
            ...input,
            educationLevel: event.target.value
          })
        break
      case 'examCode':
        if (event.target.value.length < 20)
          setInput({
            ...input,
            examCode: event.target.value
          })
        break

      case 'name':
        if (event.target.value.length < 100)
          setInput({
            ...input,
            name: event.target.value
          })
        break
      case 'schoolYear':
        if (event.target.value.length < 50)
          setInput({
            ...input,
            schoolYear: event.target.value
          })
        break
      case 'numGroups':
        setInput({
          ...input,
          numGroups: event.target.value
        })
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

    if (!input.teacher) {
      isValid = false
      errs.teacher = 'This field is required'
    }
    if (!input.classCode) {
      isValid = false
      errs.classCode = 'This field is required'
    }

    if (!input.name) {
      isValid = false
      errs.name = 'This field is required'
    }

    if (!input.schoolYear) {
      isValid = false
      errs.schoolYear = 'This field is required'
    }
    setErrors(errs)
    return isValid
  }
  function handleSubmit(event) {
    setInput({ ...input, id: null })
    event.preventDefault()
    console.log('input', input)

    if (validate()) {
      axios
        .put(`${API_URL}/subjects/${id}`, input, authHeader())
        .then((res) => {
          setInput({
            subjectCode: '',
            term: 1,
            teacher: '',
            classCode: '',
            studentYear: '',
            educationLevel: '',
            examCode: '',
            name: '',
            schoolYear: '',
            numGroups: 1
          })
          toast.success('Update successfully', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })
          setRedirect(true)
        })
        .catch((err) => {})
    }
  }
  if (redirect)
    return redirectTo ? (
      <Redirect to={redirectTo} />
    ) : (
      <Redirect to='/subject' />
    )

  return (
    <div className='container-fluid'>
      {/* Title */}
      <div className='row heading-bg'>
        <div className='col-lg-3 col-md-4 col-sm-4 col-xs-12'>
          <h5 className='txt-dark'>Update subject</h5>
        </div>
        {/* Breadcrumb */}
        <div className='col-lg-9 col-sm-8 col-md-8 col-xs-12'>
          <ol className='breadcrumb'>
            <li>
              <a href='index.html'>HCMUSID</a>
            </li>
            <li>
              <a href='/subject'>Subjects</a>
            </li>
            <li className='active'>
              <span>{currentSubject?.name}</span>
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
                        Subject name (*)
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        name='name'
                        onChange={handleChange}
                        placeholder='Enter name'
                        value={input.name}
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
                        Academic year
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
                    <div className='form-group'>
                      <label className='control-label mb-10'>
                        Number of rooms
                      </label>
                      <input
                        className='form-control'
                        value={input.numGroups}
                        name='numGroups'
                        onChange={handleChange}
                        type='number'
                        min={1}
                      />
                    </div>
                    {/* <div
                      className={`form-group ${errors.examDate && 'has-error'}`}
                    >
                      <label className='control-label mb-10 text-left'>
                        Exam date
                      </label>
                      <DatePicker
                        className='form-control'
                        onChange={setExamDate}
                        value={examDate}
                      />
                      {errors.examDate && (
                        <div className='help-block with-errors'>
                          {errors.examDate}
                        </div>
                      )}
                    </div>
                    <div
                      className={`form-group ${
                        errors.startTime && 'has-error'
                      }`}
                    >
                      <label className='control-label mb-10 text-left'>
                        Giờ bắt đầu
                      </label>
                      <TimePicker
                        className='form-control'
                        onChange={onChangeTime}
                        value={startTime}
                      />
                      {errors.startTime && (
                        <div className='help-block with-errors'>
                          {errors.startTime}
                        </div>
                      )}
                    </div>
                    <div className='form-group'>
                      <label className='control-label mb-10 text-left'>
                        Thời gian thi
                      </label>
                      <input
                        type='number'
                        className='form-control'
                        name='examTime'
                        onChange={handleChange}
                        value={input.examTime}
                        placeholder='Nhập thời gian thi'
                      />
                    </div> */}
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
                        placeholder='Enter teacher name'
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
                      Update
                    </button>
                    <button
                      className='btn btn-default'
                      onClick={() => setRedirect(true)}
                    >
                      Cancel
                    </button>
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

export default EditSubject
