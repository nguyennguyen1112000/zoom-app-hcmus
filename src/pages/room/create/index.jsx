import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { authHeader } from '../../../helper/utils'
import { getAllSubjects } from '../../../services/api/subject'
function CreateRoom() {
  const API_URL = process.env.REACT_APP_API_URL
  const [input, setInput] = useState({
    name: '',
    zoomId: '',
    passcode: '',
    description: '',
    url: '',
    subjectId: null,
    roomCode: ''
  })

  const [errors, setErrors] = useState({
    name: null,
    zoomId: null,
    passcode: null,
    url: null
  })
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllSubjects())
  }, [dispatch])
  const subjects = useSelector((state) => state.subject.subjects)
  function handleChange(event) {
    switch (event.target.name) {
      case 'name':
        setInput({
          ...input,
          name: event.target.value
        })
        break
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
      case 'description':
        setInput({
          ...input,
          description: event.target.value
        })
        break
      case 'url':
        setInput({
          ...input,
          url: event.target.value
        })
        break
      case 'subjectId':
        setInput({
          ...input,
          subjectId: event.target.value
        })
        break
      case 'roomCode':
        setInput({
          ...input,
          roomCode: event.target.value
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
      errs.name = 'This field is required'
    }
    if (!input.passcode) {
      isValid = false
      errs.passcode = 'This field is required'
    }
    if (!input.url) {
      isValid = false
      errs.url = 'This field is required'
    }
    if (!input.zoomId) {
      isValid = false
      errs.zoomId = 'This field is required'
    }
    setErrors(errs)
    return isValid
  }
  function handleSubmit(event) {
    event.preventDefault()

    if (validate()) {
      axios
        .post(`${API_URL}/rooms`, input, authHeader())
        .then((res) => {
          setInput({
            name: '',
            zoomId: '',
            passcode: '',
            description: '',
            url: '',
            subjectId: '',
            roomCode: ''
          })
          setErrors({
            name: null,
            zoomId: null,
            passcode: null,
            url: null
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
          <h5 className='txt-dark'>Room form</h5>
        </div>
        {/* Breadcrumb */}
        <div className='col-lg-9 col-sm-8 col-md-8 col-xs-12'>
          <ol className='breadcrumb'>
            <li>
              <a href='/room'>HCMUSID</a>
            </li>
            <li>
              <a href='/subject'>Rooms</a>
            </li>
            <li className='active'>
              <span>Create new room</span>
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
                        placeholder={`Enter room's name`}
                      />
                      {errors.name && (
                        <div className='help-block with-errors'>
                          {errors.name}
                        </div>
                      )}
                    </div>
                    <div
                      className={`form-group ${errors.zoomId && 'has-error'}`}
                    >
                      <label className='control-label mb-10 text-left'>
                        Zoom meeting ID(*)
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        name='zoomId'
                        onChange={handleChange}
                        value={input.zoomId}
                        placeholder={`Enter zoom meeting id`}
                      />
                      {errors.zoomId && (
                        <div className='help-block with-errors'>
                          {errors.zoomId}
                        </div>
                      )}
                    </div>
                    <div
                      className={`form-group ${errors.zoomId && 'has-error'}`}
                    >
                      <label className='control-label mb-10 text-left'>
                        Zoom meeting passcode(*)
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        name='passcode'
                        onChange={handleChange}
                        value={input.passcode}
                        placeholder={`Enter zoom meeting password`}
                      />
                      {errors.passcode && (
                        <div className='help-block with-errors'>
                          {errors.passcode}
                        </div>
                      )}
                    </div>
                    <div className={`form-group ${errors.url && 'has-error'}`}>
                      <label className='control-label mb-10 text-left'>
                        Zoom's join link (*)
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        name='url'
                        onChange={handleChange}
                        value={input.url}
                        placeholder='Enter join link'
                      />
                      {errors.url && (
                        <div className='help-block with-errors'>
                          {errors.url}
                        </div>
                      )}
                    </div>
                    <div className='form-group'>
                      <label className='control-label mb-10 text-left'>
                        Description
                      </label>
                      <textarea
                        className='form-control'
                        name='description'
                        rows={5}
                        value={input.description}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='form-group'>
                      <label className='control-label mb-10'>Room code</label>
                      <input
                        type='text'
                        className='form-control'
                        name='roomCode'
                        onChange={handleChange}
                        value={input.roomCode}
                        placeholder='Enter room code (Ex: P01, P02...)'
                      />
                    </div>
                    <div className='form-group'>
                      <label className='control-label mb-10'>Subject</label>
                      <select
                        className='form-control'
                        data-placeholder='Choose a subject'
                        name='subjectId'
                        onChange={handleChange}
                        value={input.subjectId}
                      >
                        <option value={null}>
                         ----Select subject ----
                        </option>
                        {subjects?.map((subject, index) => (
                          <option key={index} value={subject.id}>
                            {subject.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </form>
                  <div className='form-actions mt-10'>
                    <button
                      className='btn btn-success  mr-10'
                      onClick={handleSubmit}
                    >
                      Save
                    </button>
                    <a href='/room' className='btn btn-default'>
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

export default CreateRoom
