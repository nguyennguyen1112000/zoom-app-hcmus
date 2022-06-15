import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import TimePicker from 'react-time-picker'
import DatePicker from 'react-date-picker'
import swal from 'sweetalert'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  authHeader,
  generatePassword,
  handleExpiredToken,
  roundToNearestHour
} from '../../../helper/utils'
function CreateMeeting() {
  const API_URL = process.env.REACT_APP_API_URL
  const defaultPassword = generatePassword()
  const [input, setInput] = useState({
    agenda: '',
    default_password: false,
    duration: 60,
    password: defaultPassword,
    settings: {
      host_video: false,
      mute_upon_entry: false,
      participant_video: false,
      waiting_room: false,
      use_pmi: false,
      join_before_host: false,
      jbh_time: 0,
      auto_recording: ''
      //alternative_hosts: ''
    },
    start_time: new Date().toUTCString(),
    timezone: 'Asia/Vietnam',
    topic: 'My Meeting',
    type: 2
  })

  const [errors, setErrors] = useState({
    topic: null,
    term: null,
    teacher: null,
    classCode: null,
    examTime: null,
    name: null,
    schoolYear: null,
    examDate: null,
    startTime: null
  })
  const [startTime, onChangeTime] = useState(
    roundToNearestHour(new Date()).getHours() +
      ':' +
      roundToNearestHour(new Date()).getMinutes()
  )
  const [startDate, onChangeDate] = useState(roundToNearestHour(new Date()))
  const [duration, setDuration] = useState({ hours: 1, minutes: 0 })
  function handleChange(event) {
    switch (event.target.name) {
      case 'agenda':
        if (event.target.value.length <= 2000)
          setInput({
            ...input,
            agenda: event.target.value
          })
        break
      case 'topic':
        if (event.target.value.length <= 200)
          setInput({
            ...input,
            topic: event.target.value
          })
        break
      case 'duration_hours':
        setDuration({ ...duration, hours: parseFloat(event.target.value) })
        setInput({
          ...input,
          duration: parseInt(event.target.value) * 60 + duration.minutes
        })
        break
      case 'duration_minutes':
        setDuration({ ...duration, minutes: parseFloat(event.target.value) })
        setInput({
          ...input,
          duration: duration.hours * 60 + parseFloat(event.target.value)
        })
        break
      case 'password':
        setInput({
          ...input,
          password: event.target.value
        })
        break
      case 'host_video':
        setInput({
          ...input,
          settings: { ...input.settings, host_video: event.target.value }
        })
        break
      case 'mute_upon_entry':
        setInput({
          ...input,
          settings: { ...input.settings, mute_upon_entry: event.target.checked }
        })
        break
      case 'participant_video':
        setInput({
          ...input,
          settings: {
            ...input.settings,
            participant_video: event.target.value
          }
        })
        break
      case 'waiting_room':
        console.log('event.target.checked', event.target.checked)

        setInput({
          ...input,
          settings: { ...input.settings, waiting_room: event.target.checked }
        })
        break
      case 'use_pmi':
        setInput({
          ...input,
          settings: { ...input.settings, use_pmi: event.target.value }
        })
        break
      case 'jbh_time':
        setInput({
          ...input,
          settings: {
            ...input.settings,
            join_before_host: event.target.checked
          }
        })
        break
      case 'auto_recording':
        console.log('event.target.checked', event.target.checked)

        setInput({
          ...input,
          settings: {
            ...input.settings,
            auto_recording: event.target.checked ? 'local' : ''
          }
        })
        break
      case 'start_time':
        setInput({
          ...input,
          start_time: event.target.value
        })
        break
      case 'alternative_hosts':
        console.log(event.target.value)

        break

      default:
        break
    }
    console.log('input', input)
  }
  function validate() {
    let isValid = true
    var errs = {}
    if (!input.subjectCode) {
      isValid = false
      errs.subjectCode = 'Không được để trống'
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
    // if (input.examDate < new Date()) {
    //   isValid = false
    //   errs.examDate = 'Ngày thi không được nhỏ hơn ngày hiện tại'
    // }
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
    console.log(input, startDate, startTime)
    const date = new Date(startDate)
    date.setHours(parseInt(startTime.split(':')[0]))
    date.setMinutes(parseInt(startTime.split(':')[1]))
    axios
      .post(
        `${API_URL}/zooms/meeting`,
        input,
        authHeader()
      )
      .then((res) => {
        setInput({
          agenda: '',
          default_password: false,
          duration: 60,
          password: defaultPassword,
          settings: {
            host_video: false,
            mute_upon_entry: false,
            participant_video: false,
            waiting_room: false,
            use_pmi: false,
            join_before_host: false,
            jbh_time: 0,
            auto_recording: ''
            //alternative_hosts: ''
          },
          start_time: new Date(
            date.toString().split('GMT')[0] + ' UTC'
          ).toISOString(),
          timezone: 'Asia/Vietnam',
          topic: 'My Meeting',
          type: 2
        })
        toast.success('Create Zoom Meeting successfully', {
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
        handleExpiredToken(err, swal)
      })
  }

  return (
    <div className='container-fluid'>
      {/* Title */}
      <div className='row heading-bg'>
        <div className='col-lg-3 col-md-4 col-sm-4 col-xs-12'>
          <h5 className='txt-dark'>Create meeting</h5>
        </div>
        {/* Breadcrumb */}
        <div className='col-lg-9 col-sm-8 col-md-8 col-xs-12'>
          <ol className='breadcrumb'>
            <li>
              <a href='index.html'>HCMUSID</a>
            </li>
            <li>
              <a href='/subject'>Room List</a>
            </li>
            <li className='active'>
              <span>Create Zoom meeting</span>
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
                      className={`form-group ${errors.topic && 'has-error'}`}
                    >
                      <label className='control-label mb-10 text-left'>
                        Topic
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        name='topic'
                        onChange={handleChange}
                        value={input.topic}
                        placeholder='My Meeting'
                      />
                      {errors.topic && (
                        <div className='help-block with-errors'>
                          {errors.topic}
                        </div>
                      )}
                    </div>
                    <div
                      className={`form-group ${errors.agenda && 'has-error'}`}
                    >
                      <label className='control-label mb-10 text-left'>
                        Description
                      </label>
                      <textarea
                        className='form-control'
                        name='agenda'
                        rows={5}
                        defaultValue={''}
                        value={input.agenda}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='form-group'>
                      <label className='control-label mb-10 text-left'>
                        When
                      </label>
                      <div className='row'>
                        <div className='col-md-6 col-sm-12 col-xs-12 form-group'>
                          <DatePicker
                            className='form-control'
                            minDate={new Date()}
                            value={startDate}
                            onChange={onChangeDate}
                          />
                        </div>
                        <div className='col-md-6 col-sm-12 col-xs-12 form-group'>
                          <TimePicker
                            className='form-control'
                            value={startTime}
                            onChange={onChangeTime}
                          />
                          {errors.startTime && (
                            <div className='help-block with-errors'>
                              {errors.startTime}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className='form-group'>
                      <label className='control-label mb-10 text-left'>
                        Duration
                      </label>
                      <div className='row'>
                        <div className='col-md-5 col-sm-10 col-xs-10 form-group'>
                          <select
                            className='form-control'
                            tabIndex={input.term}
                            onChange={handleChange}
                            name='duration_hours'
                          >
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                            <option value='6'>6</option>
                            <option value='7'>7</option>
                            <option value='8'>8</option>
                            <option value='9'>9</option>
                            <option value='10'>10</option>
                            <option value='11'>11</option>
                            <option value='12'>12</option>
                            <option value='13'>13</option>
                            <option value='14'>14</option>
                            <option value='15'>15</option>
                            <option value='16'>16</option>
                            <option value='17'>17</option>
                            <option value='18'>18</option>
                            <option value='19'>19</option>
                            <option value='20'>20</option>
                            <option value='21'>21</option>
                            <option value='22'>22</option>
                            <option value='23'>23</option>
                            <option value='24'>24</option>
                          </select>
                        </div>
                        <div className='col-md-1'>hr</div>
                        <div className='col-md-5 col-sm-10 col-xs-10 form-group'>
                          <select
                            className='form-control '
                            name='duration_minutes'
                            onChange={handleChange}
                          >
                            <option value='0'>0</option>
                            <option value='15'>15</option>
                            <option value='30'>30</option>
                            <option value='45'>45</option>
                          </select>
                        </div>
                        <div className='col-md-1'>min</div>
                      </div>
                    </div>
                    <div className='form-group'>
                      <label className='control-label mb-10'>Meeting ID</label>
                      <div>
                        <div className='radio'>
                          <input
                            type='radio'
                            name='use_pmi'
                            id='ami'
                            value={false}
                            onChange={handleChange}
                            defaultChecked
                          />
                          <label htmlFor='ami'>Generate Automatically</label>
                        </div>
                        <div className='radio'>
                          <input
                            type='radio'
                            name='use_pmi'
                            id='pmi'
                            value={true}
                            onChange={handleChange}
                          />
                          <label htmlFor='pmi'>Personal Meeting </label>
                        </div>
                      </div>
                    </div>

                    <div className='form-group mb-30'>
                      <label className='control-label mb-10 text-left'>
                        Security
                      </label>
                      <div className='row'>
                        <div className='col-md-2'>
                          <div className='checkbox checkbox-primary'>
                            <input
                              id='default_password'
                              type='checkbox'
                              name='default_password'
                              disabled
                              checked
                            />
                            <label htmlFor='password'>Password</label>
                          </div>
                        </div>
                        <div className='col-md-10'>
                          <input
                            type='text'
                            name='password'
                            onChange={handleChange}
                            value={input.password}
                          />
                          {errors.password && (
                            <div className='help-block with-errors'>
                              {errors.password}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className='checkbox checkbox-primary'>
                        <input
                          id='waiting_room'
                          type='checkbox'
                          name='waiting_room'
                          checked={input.settings.waiting_room}
                          onChange={handleChange}
                        />
                        <label htmlFor='waiting_room'>Waiting room</label>
                      </div>
                    </div>
                    <div
                      className={`form-group ${
                        errors.studentYear && 'has-error'
                      }`}
                    >
                      <label className='control-label mb-10 text-left'>
                        Video
                      </label>
                      <div className='radio-list'>
                        <span>Host</span>

                        <div className='radio-inline pl-10'>
                          <span className='radio radio-info'>
                            <input
                              type='radio'
                              name='host_video'
                              id='host_video_on'
                              value='true'
                              onChange={handleChange}
                            />
                            <label htmlFor='host_video_on'>on</label>
                          </span>
                        </div>
                        <div className='radio-inline'>
                          <span className='radio radio-info'>
                            <input
                              type='radio'
                              name='host_video'
                              id='host_video_off'
                              value='false'
                              defaultChecked
                              onChange={handleChange}
                            />
                            <label htmlFor='host_video_off'>off </label>
                          </span>
                        </div>
                      </div>
                      <div className='radio-list'>
                        <span>Participant</span>

                        <div className='radio-inline pl-10'>
                          <span className='radio radio-info'>
                            <input
                              type='radio'
                              name='participant_video'
                              id='participant_video_on'
                              value='true'
                              onChange={handleChange}
                            />
                            <label htmlFor='participant_video_on'>on</label>
                          </span>
                        </div>
                        <div className='radio-inline'>
                          <span className='radio radio-info'>
                            <input
                              type='radio'
                              name='participant_video'
                              id='participant_video_off'
                              value='false'
                              defaultChecked
                              onChange={handleChange}
                            />
                            <label htmlFor='participant_video_off'>off</label>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='form-group'>
                      <label className='control-label mb-10'>Option</label>
                      <div className='checkbox checkbox-primary'>
                        <input
                          id='jbh_time'
                          type='checkbox'
                          name='jbh_time'
                          checked={input.settings.join_before_host}
                          onChange={handleChange}
                        />
                        <label htmlFor='jbh_time'>
                          Allow participants to join anytime
                        </label>
                      </div>
                      <div className='checkbox checkbox-primary'>
                        <input
                          id='mute_upon_entry'
                          type='checkbox'
                          name='mute_upon_entry'
                          checked={input.settings.mute_upon_entry}
                          onChange={handleChange}
                        />
                        <label htmlFor='mute_upon_entry'>
                          Mute participants upon entry
                        </label>
                      </div>
                      <div className='checkbox checkbox-primary'>
                        <input
                          id='auto_recording'
                          name='auto_recording'
                          type='checkbox'
                          checked={input.settings.auto_recording === 'local'}
                          onChange={handleChange}
                        />
                        <label htmlFor='auto_recording'>
                          Automatically record meeting on the local computer
                        </label>
                      </div>
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

export default CreateMeeting
