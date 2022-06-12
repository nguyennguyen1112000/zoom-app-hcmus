/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { authHeader, formatDate, formatTime } from '../../../helper/utils'
import { getRoom } from '../../../services/api/room'
import { getIdentityResults } from '../../../services/api/student'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  getAllSubjects,
  getCurrentSubject
} from '../../../services/api/subject'
import axios from 'axios'
import TimePicker from 'react-time-picker/dist/TimePicker'
import DatePicker from 'react-date-picker'
import { getAllUsers } from '../../../services/api/users'
import { Link } from 'react-router-dom'
const API_URL = process.env.REACT_APP_API_URL
function RoomDetail() {
  const dispatch = useDispatch()
  const [mode, setMode] = useState({ checkInConfig: false })
  let { id } = useParams()
  const user = useSelector((state) => state.auth.currentUser)
  const currentRoom = useSelector((state) => state.room.currentRoom)
  const records = useSelector((state) => state.student.identityResults)
  const subjects = useSelector((state) => state.subject.subjects)
  const proctorList = useSelector((state) => state.user.userList)
  const currentSubject = useSelector((state) => state.subject.currentSubject)
  const [reload, setReload] = useState(false)
  const [subjectId, setSubjectId] = useState(null)
  const [startTime, setStartTime] = useState('07:00')
  const [endTime, setEndTime] = useState('08:00')
  const [examDate, setExamDate] = useState(new Date())
  const [searchTerm, setSearchTerm] = useState('')
  const [searchProctor, setSearchProctor] = useState(null)
  const [input, setInput] = useState({
    checkInConfigType: 'manual',
    checkInStartTime: startTime,
    checkInEndTime: endTime
  })
  const [studentsChooice, setStudentChoice] = useState([])
  useEffect(() => {
    setTimeout(() => {
      $('#datable_1').DataTable().destroy()
      dispatch(getAllSubjects())
      dispatch(getAllUsers('proctor'))
      if (id) {
        dispatch(getRoom(id))
        dispatch(getIdentityResults(id))
      }
    }, 2000)
  }, [dispatch, id, reload])
  useEffect(() => {
    $('#datable_1').DataTable()
  }, [currentRoom, reload])
  useEffect(() => {
    if (currentSubject && currentRoom) {
      let students = []
      currentSubject.students.forEach((student) => {
        if (!currentRoom.students.some((s) => s.id === student.id))
          students.push(student)
      })
      setStudentChoice(students)
    }
    
  }, [currentSubject])
  useEffect(() => {
    if (currentRoom) {
      setInput({ ...input, checkInConfigType: currentRoom.checkInConfigType })
      setExamDate(new Date(currentRoom?.checkInStartTime))
      if (currentRoom.checkInConfigType === 'automation')
        setStartTime(
          new Date(currentRoom?.checkInStartTime).getHours() +
            ':' +
            new Date(currentRoom?.checkInStartTime).getMinutes()
        )
      setEndTime(
        new Date(currentRoom?.checkInEndTime).getHours() +
          ':' +
          new Date(currentRoom?.checkInEndTime).getMinutes()
      )
      dispatch(getCurrentSubject(currentRoom?.subject?.id))
    }
  }, [currentRoom])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        const proctor = proctorList?.filter((x) => x.staffCode == searchTerm)
        if (proctor.length > 0) setSearchProctor(proctor[0])
        else setSearchProctor(null)
      }
    }, 2000)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])
  const [select, setSelect] = useState([])
  const [selectStudents, setSelectStudents] = useState([])

  /*************Handle add proctor ********** */
  const handleAddProctor = () => {
    axios
      .post(
        `${API_URL}/rooms/${currentRoom?.id}/proctor`,
        { staffCode: searchTerm },
        authHeader()
      )
      .then((res) => {
        setSearchProctor(null)
        setSearchTerm('')
        toast.success('Added successfully', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
        document.getElementById('close-modal').click()
        setReload(!reload)
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message, {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
      })
  }

  /*************Handle add students ********** */
  const handleAddStudents = () => {
    axios
      .post(
        `${API_URL}/rooms/${currentRoom?.id}/students`,
        { studentIds: selectStudents },
        authHeader()
      )
      .then((res) => {
        toast.success('Added successfully', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
        document.getElementById('close-modal-student').click()
        setStudentChoice([])
        setReload(!reload)
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message, {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
      })
  }
  /*************Handle delete students********** */
  const handleSelect = (e) => {
    const index = e.currentTarget.getAttribute('index')
    const checked = e.target.checked
    if (checked) setSelect([...select, parseInt(index)])
    else setSelect(select.filter((x) => x != parseInt(index)))
  }

  const handleSelectAll = (e) => {
    const checked = e.target.checked
    if (checked) setSelect(currentRoom?.students?.map((student) => student.id))
    else setSelect([])
  }

  const isChecked = (index) => {
    return select.includes(index)
  }
  const handleDelete = (e) => {
    e.preventDefault()

    axios
      .delete(`${API_URL}/rooms/${currentRoom?.id}/students`, {
        data: select,
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      })
      .then((res) => {
        toast.success('Delete students successfully', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
        setReload(!reload)
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message, {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
        console.log(err.response.data.message)
      })
  }
  /*************Handle add students from subject ********** */
  const handleSelectStudents = (e) => {
    const index = e.currentTarget.getAttribute('index')
    const checked = e.target.checked
    if (checked) setSelectStudents([...selectStudents, parseInt(index)])
    else setSelectStudents(selectStudents.filter((x) => x != parseInt(index)))
  }
  const handleSelectAllStudents = (e) => {
    const checked = e.target.checked
    if (checked) setSelectStudents(studentsChooice.map((student) => student.id))
    else setSelectStudents([])
  }
  const isCheckedStudent = (index) => {
    return selectStudents.includes(index)
  }
  /*************Handle delete proctor********** */
  const handleDeleteProctor = (e) => {
    e.preventDefault()
    const id = e.currentTarget.getAttribute('index')
    swal({
      title: 'Are you sure?',
      text: 'This record and it`s details will be permanantly deleted!',
      icon: 'warning',
      buttons: ['Cancel', 'Yes!']
    }).then(function (value) {
      if (value) {
        axios
          .delete(
            `${API_URL}/rooms/${currentRoom?.id}/proctor/${id}`,
            authHeader()
          )
          .then((res) => {
            toast.success('Delete proctor successfully', {
              position: 'top-right',
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            })
            setReload(!reload)
          })
          .catch((err) => {
            toast.error(err?.response?.data?.message, {
              position: 'top-right',
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            })
            console.log(err.response.data.message)
          })
      }
    })
  }

  const handleUpdateSubject = () => {
    axios
      .put(
        `${API_URL}/rooms/${currentRoom?.id}/subject`,
        { subjectId },
        authHeader()
      )
      .then((res) => {
        toast.success('Update successfully', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
        setReload(!reload)
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message, {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
      })
  }
  const handleUpdateConfig = () => {
    let checkInStartTime = examDate
    let checkInEndTime = new Date(examDate.getTime())

    checkInStartTime.setHours(startTime.split(':')[0])
    checkInStartTime.setMinutes(startTime.split(':')[1])

    checkInEndTime.setHours(endTime.split(':')[0])
    checkInEndTime.setMinutes(endTime.split(':')[1])

    axios
      .put(
        `${API_URL}/rooms/${currentRoom?.id}`,
        {
          checkInConfigType: input.checkInConfigType,
          checkInStartTime,
          checkInEndTime
        },
        authHeader()
      )
      .then((res) => {
        setMode({ checkInConfig: false })
        toast.success('Update successfully', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
        setReload(!reload)
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message, {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
      })
  }

  const downloadTemplate = (e) => {
    e.preventDefault()
    const downloadLink = `${API_URL}/rooms/template/add_students`
    const a = document.createElement('a')
    a.href = downloadLink
    a.click()
  }
  /*************** Upload file ****************/
  const uploadStudentFile = (e) => {
    const formData = new FormData()
    //console.log('e.target.value', e.target.file)

    formData.append('file', e.target.files[0])
    axios
      .post(
        `${API_URL}/rooms/upload/${currentSubject?.id}/students`,
        formData,
        authHeader()
      )
      .then((res) => {
        e.target.value = null
        toast.success('Upload successfully', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
        setReload(!reload)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleCheckIn = (e) => {
    // //href={`/room/${currentRoom?.id}/verify/s1`}
    e.preventDefault()
    axios
      .get(`${API_URL}/rooms/${currentRoom?.id}/canVerify`, authHeader())
      .then((res) => {
        if (res.data.verifySuccess)
          swal('You checked-in successully!', {
            buttons: false,
            timer: 3000
          })
        else if (!res.data.timeToVerify)
          swal("It's not exam time yet, Please try again later!", {
            buttons: false,
            timer: 3000
          })
        else if (res.data.failExceed)
          swal('The number of failures exceeds the limit', {
            buttons: false,
            timer: 3000
          })
        else
          window.open(
            `/room/${currentRoom?.id}/verify/s1`,
            '_blank',
            'noopener,noreferrer'
          )
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const renderStudentRoom = () => {
    return (
      <div className='container-fluid'>
        {/* Title */}
        <div className='row heading-bg'>
          {/* Breadcrumb */}
          <div className='col-lg-12 col-sm-8 col-md-8 col-xs-12'>
            <ol className='breadcrumb'>
              <li>
                <a href='index.html'>{user && user.studentId}</a>
              </li>
              <li>
                <a href='/room'>
                  <span>Rooms</span>
                </a>
              </li>
              <li className='active'>
                <span>{currentRoom && currentRoom.name}</span>
              </li>
            </ol>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-12'>
            <div className='panel panel-default card-view'>
              <div className='panel-heading'>
                <div className='pull-left'>
                  <h6 className='panel-title txt-dark'>Room Information</h6>
                </div>
                <div className='clearfix' />
              </div>
              <div className='panel-wrapper collapse in'>
                <div className='panel-body'>
                  <div className='table-responsive mt-40'>
                    <table className='table table-bordered '>
                      {currentRoom && (
                        <tbody>
                          <tr>
                            <td className='table-title-cell '>Room name</td>
                            <td colSpan={7}>{currentRoom.name}</td>
                          </tr>
                          <tr>
                            <td className='table-title-cell '>Zoom ID</td>
                            <td colSpan={7}>{currentRoom.zoomId}</td>
                          </tr>
                          <tr>
                            <td className='table-title-cell'>Passcode</td>
                            <td colSpan={7}> {currentRoom.passcode}</td>
                          </tr>
                          <tr>
                            <td className='table-title-cell'>Link Zoom</td>
                            <td colSpan={7}>
                              <a
                                style={{ display: 'table-cell' }}
                                target='_blank'
                                rel='noopener noreferrer'
                                href={currentRoom.url}
                              >
                                {currentRoom.url}
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td className='table-title-cell'>Room code</td>
                            <td colSpan={7}>{currentRoom.roomCode}</td>
                          </tr>
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-lg-12'>
            <div className='panel panel-default card-view'>
              <div className='panel-heading'>
                <div className='pull-left'>
                  <h6 className='panel-title txt-dark'>Check-in</h6>
                </div>
              </div>
              <div className='panel-wrapper collapse in'>
                <div className='panel-body'>
                  <form className='form-horizontal' role='form'>
                    <div className='form-body'>
                      <div className='row'>
                        <div className='col-md-8'>
                          <div className='form-group'>
                            <label className='control-label col-md-4 bold-title'>
                              Check-in start time
                            </label>
                            <div className='col-md-8'>
                              <p className='form-control-static'>
                                {currentRoom &&
                                  currentRoom.checkInStartTime &&
                                  formatTime(
                                    new Date(currentRoom.checkInStartTime)
                                  )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-8'>
                          <div className='form-group'>
                            <label className='control-label col-md-4 bold-title'>
                              Check-in end time:
                            </label>
                            <div className='col-md-4'>
                              <p className='form-control-static'>
                                {currentRoom &&
                                  currentRoom.checkInEndTime &&
                                  formatTime(
                                    new Date(currentRoom.checkInEndTime)
                                  )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class='form-actions mt-10'>
                        <div class='row'>
                          <div class='col-md-6'>
                            <div class='row'>
                              <div class='col-md-offset-3 col-md-9'>
                                <a
                                  class='btn btn-success  mr-10'
                                  onClick={handleCheckIn}
                                >
                                  Check-in
                                </a>
                              </div>
                            </div>
                          </div>
                          <div class='col-md-6'> </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-lg-12'>
            <div className='panel panel-default card-view'>
              <div className='panel-heading'>
                <div className='pull-left'>
                  <h6 className='panel-title txt-dark'>Verifying Results</h6>
                </div>
              </div>
              <div className='panel-wrapper collapse in'>
                <div className='panel-body'>
                  <div className='table-wrap'>
                    <div className='table-responsive'>
                      <table className='table  display table-hover mb-30'>
                        <thead>
                          <tr>
                            <th> #</th>
                            <th>Code</th>
                            <th>Check-in Time</th>
                            <th>Face recognition status</th>
                            <th>Id verification status</th>
                            <th>Face image</th>
                            <th>Student ID/ID Card Image</th>
                            <th>Image type</th>
                          </tr>
                        </thead>

                        <tbody>
                          {(!records || records?.length == 0) &&
                            'No records to show'}

                          {records?.map((record, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{record.id}</td>
                              <td>{formatTime(new Date(record.created_at))}</td>
                              <td>
                                {record.faceStatus ? (
                                  <span class='label label-success'>
                                    Success
                                  </span>
                                ) : (
                                  <span class='label label-danger'>Fail</span>
                                )}
                              </td>
                              <td>
                                {record.idStatus ? (
                                  <span class='label label-success'>
                                    Success
                                  </span>
                                ) : (
                                  <span class='label label-danger'>Fail</span>
                                )}
                              </td>
                              <td>
                                <a href={record.faceImage?.imageUrl}>
                                  {record.faceImage?.imageUrl && 'View'}
                                </a>
                              </td>
                              <td>
                                <a href={record.cardImage?.imageUrl}>
                                  {record.cardImage?.imageUrl && 'View'}
                                </a>
                              </td>
                              <td>{record.cardImage?.type}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*/Row*/}
      </div>
    )
  }
  const renderAdminRoom = () => {
    return (
      <div className='container-fluid'>
        {/* Title */}
        <div className='row heading-bg'>
          {/* Breadcrumb */}
          <div className='col-lg-12 col-sm-8 col-md-8 col-xs-12'>
            <ol className='breadcrumb'>
              <li>
                <a href='/'>HCMUSID</a>
              </li>
              <li>
                <a href='/room'>
                  <span>Room zooms</span>
                </a>
              </li>
              <li className='active'>
                <span>{currentRoom?.name}</span>
              </li>
            </ol>
          </div>
          {/* /Breadcrumb */}
        </div>
        {/* /Title */}
        {/*Row*/}
        <div className='row'>
          <div className='col-md-12'>
            <div className='panel panel-default card-view'>
              <div className='panel-heading'>
                <div className='pull-left'>
                  <h6 className='panel-title txt-dark'>Room Information </h6>
                </div>
                <div className='pull-right'>
                  <Link
                    to={`/room/update/${
                      currentRoom?.id
                    }?redirectTo=${`/room/${currentRoom?.id}`}`}
                  >
                    <button className='btn btn-default btn-icon-anim btn-square edit-button'>
                      <i className='fa fa-pencil' />
                    </button>
                  </Link>
                </div>
              </div>
              <div className='panel-wrapper collapse in'>
                <div className='panel-body'>
                  <div className='table-responsive mt-40'>
                    <table className='table table-bordered '>
                      {currentRoom && (
                        <tbody>
                          <tr>
                            <td className='table-title-cell '>Room name</td>
                            <td colSpan={7}>{currentRoom.name}</td>
                          </tr>
                          <tr>
                            <td className='table-title-cell '>Zoom ID</td>
                            <td colSpan={7}>{currentRoom.zoomId}</td>
                          </tr>
                          <tr>
                            <td className='table-title-cell'>Passcode</td>
                            <td colSpan={7}> {currentRoom.passcode}</td>
                          </tr>
                          <tr>
                            <td className='table-title-cell'>Link Zoom</td>
                            <td colSpan={7}>
                              <a
                                style={{ display: 'table-cell' }}
                                target='_blank'
                                rel='noopener noreferrer'
                                href={currentRoom.url}
                              >
                                {currentRoom.url}
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td className='table-title-cell'>Room Code</td>
                            <td colSpan={7}>{currentRoom.roomCode}</td>
                          </tr>

                          <tr>
                            <th className='table-title-cell'>Subject</th>
                            <td colSpan={7}>
                              <a href={`/subject/${currentRoom.subject?.id}`}>
                                {currentRoom.subject?.name
                                  ? currentRoom.subject.name
                                  : 'Not yet selected'}
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td className='table-title-cell'>Description</td>
                            <td colSpan={7}>{currentRoom.description}</td>
                          </tr>
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!currentRoom?.subject && (
          <div className='row'>
            <div className='col-md-12'>
              <div className='panel panel-default card-view'>
                <div className='panel-heading'>
                  <div className='pull-left'>
                    <h6 className='panel-title txt-dark'>Subject</h6>
                  </div>

                  <div className='clearfix' />
                </div>
                <div className='panel-wrapper collapse in'>
                  <div className='panel-body'>
                    <div className='form-group'>
                      <label className='control-label mb-10'>
                        Choose subject
                      </label>
                      <select
                        className='form-control'
                        data-placeholder='Choose a subject'
                        name='subject'
                        onChange={(e) => setSubjectId(e.target.value)}
                      >
                        {subjects?.map((subject, index) => (
                          <option key={index} value={subject.id}>
                            {subject.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      className='btn btn-success edit-button'
                      onClick={handleUpdateSubject}
                    >
                      <i className='fa fa-save' /> Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className='row'>
          <div className='col-lg-12'>
            <div className='panel panel-default card-view'>
              <div className='panel-heading'>
                <div className='pull-left'>
                  <h6 className='panel-title txt-dark'>
                    Check-in Configuration
                  </h6>
                </div>
              </div>
              <div className='panel-wrapper collapse in'>
                <div className='panel-body'>
                  <div className='form-wrap'>
                    <div className='form-group mt-10'>
                      <label className='control-label'>Type</label>
                      <select
                        className='form-control'
                        disabled={!mode.checkInConfig}
                        value={input.checkInConfigType}
                        onChange={(e) =>
                          setInput({
                            ...input,
                            checkInConfigType: e.target.value
                          })
                        }
                      >
                        <option value='automation'>Auto</option>
                        <option value='manual'>Manual</option>
                      </select>
                    </div>
                    {input.checkInConfigType === 'automation' && (
                      <>
                        <div className='form-group'>
                          <label className='control-label mb-10 text-left'>
                            Exam date
                          </label>
                          <DatePicker
                            className='form-control'
                            minDate={new Date()}
                            onChange={setExamDate}
                            value={examDate}
                            disabled={!mode.checkInConfig}
                          />
                        </div>
                        <div className='form-group'>
                          <label className='control-label mb-10 text-left'>
                            Check-in Start Time
                          </label>
                          <TimePicker
                            className='form-control'
                            onChange={setStartTime}
                            value={startTime}
                            disabled={!mode.checkInConfig}
                          />
                        </div>
                        <div className='form-group'>
                          <label className='control-label mb-10 text-left'>
                            Check-in End Time
                          </label>
                          <TimePicker
                            className='form-control'
                            onChange={setEndTime}
                            value={endTime}
                            disabled={!mode.checkInConfig}
                          />
                        </div>
                      </>
                    )}

                    <div class='form-group mt-10'>
                      <div class='button-list'>
                        {mode.checkInConfig && (
                          <button
                            type='button'
                            class='btn btn-success'
                            onClick={handleUpdateConfig}
                          >
                            Save
                          </button>
                        )}
                        {!mode.checkInConfig && (
                          <button
                            type='button'
                            class='btn btn-primary'
                            onClick={() => setMode({ checkInConfig: true })}
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-lg-12'>
            <div className='panel panel-default card-view'>
              <div className='panel-heading'>
                <div className='pull-left'>
                  <h6 className='panel-title txt-dark'>Proctors</h6>
                </div>
                <div className='pull-right'>
                  <button
                    class='btn btn-primary btn-square'
                    data-toggle='modal'
                    data-target='#modalProctor'
                  >
                    <span class='btn-label'>
                      <i class='fa fa-plus'></i>
                    </span>
                  </button>
                  <div className='modal' id='modalProctor'>
                    <div className='modal-dialog'>
                      <div className='modal-content'>
                        <div className='modal-header'>
                          <button
                            type='button'
                            className='close'
                            data-dismiss='modal'
                            aria-hidden='true'
                            id='close-modal'
                          >
                            ×
                          </button>
                          <h5 className='modal-title'>Add Proctor</h5>
                        </div>
                        <div className='modal-body'>
                          <form>
                            <div className='form-group'>
                              <label
                                htmlFor='recipient-name'
                                className='control-label mb-10'
                              >
                                Proctor ID
                              </label>
                              <input
                                type='text'
                                className='form-control'
                                id='recipient-name'
                                name='proctorId'
                                placeholder='Enter proctor ID'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                              />
                              {!searchProctor && (
                                <div className='help-block with-errors'>
                                  Proctor not found
                                </div>
                              )}
                            </div>
                            {searchProctor && (
                              <div className='form-group'>
                                <label
                                  htmlFor='message-text'
                                  className='control-label mb-10'
                                >
                                  {searchProctor?.email}
                                </label>
                              </div>
                            )}
                          </form>
                        </div>
                        <div className='modal-footer'>
                          <button
                            type='button'
                            className='btn btn-default'
                            data-dismiss='modal'
                          >
                            Cancel
                          </button>
                          <button
                            type='button'
                            className='btn btn-danger'
                            onClick={handleAddProctor}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='clearfix' />
              </div>
              <div className='panel-wrapper collapse in'>
                <div className='panel-body'>
                  <div className='table-wrap'>
                    <div className='table-responsive'>
                      <table className='table  display table-hover mb-30'>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Proctor Id</th>
                            <th>Email</th>

                            <th>Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {currentRoom &&
                            currentRoom.proctors &&
                            currentRoom.proctors.map((staff, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{staff.staffCode}</td>
                                
                                <td>{staff.email}</td>

                                <td>
                                  <a
                                    href='/'
                                    data-toggle='tooltip'
                                    index={staff.staffCode}
                                    onClick={handleDeleteProctor}
                                  >
                                    <i className='fa fa-trash text-danger' />
                                  </a>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-lg-12'>
            <div className='panel panel-default card-view'>
              <div className='panel-heading'>
                <div className='pull-left'>
                  <h6 className='panel-title txt-dark'>Students</h6>
                </div>
                <div className='pull-right button-list'>
                  {select.length > 0 && (
                    <button
                      class='btn btn-danger btn-square '
                      onClick={handleDelete}
                    >
                      <span class='btn-label'>
                        <i class='fa fa-trash'></i>
                      </span>
                    </button>
                  )}
                  <button
                    class='btn btn-danger btn-outline btn-square'
                    onClick={downloadTemplate}
                  >
                    <span class='btn-label'>
                      <i class='fa fa-download'></i>
                    </span>
                  </button>
                  <button class='btn btn-success btn-outline btn-square fileupload'>
                    <span class='btn-label'>
                      <i class='fa fa-upload'></i>
                    </span>
                    <input
                      id='file_upload'
                      type='file'
                      className='upload'
                      onChange={uploadStudentFile}
                    />
                  </button>
                  <button
                    class='btn btn-primary btn-square'
                    data-toggle='modal'
                    data-target='#addStudentModal'
                  >
                    <span class='btn-label'>
                      <i class='fa fa-plus'></i>
                    </span>
                  </button>
                  <div className='modal' id='addStudentModal'>
                    <div className='modal-dialog modal-dialog-custom'>
                      <div className='modal-content modal-content-custom'>
                        <div className='modal-header'>
                          <button
                            type='button'
                            className='close'
                            data-dismiss='modal'
                            aria-hidden='true'
                            id='close-modal-student'
                          >
                            ×
                          </button>
                          <h5 className='modal-title'>
                            Choose students from {currentSubject?.name}
                          </h5>
                        </div>
                        <div className='modal-body modal-body-custom'>
                          <div className='table-wrap'>
                            <div className='table-responsive'>
                              <table className='table table-hover display  pb-30'>
                                <thead>
                                  <tr>
                                    <th>
                                      {studentsChooice && (
                                        <input
                                          type='checkbox'
                                          name='checkbox'
                                          index='all'
                                          onChange={handleSelectAllStudents}
                                        />
                                      )}
                                    </th>
                                    <th>#</th>
                                    <th>Id</th>
                                    <th>Full name</th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {studentsChooice.map((student, index) => (
                                    <tr key={index}>
                                      <td>
                                        <input
                                          type='checkbox'
                                          name='checkbox'
                                          index={student.id}
                                          onChange={handleSelectStudents}
                                          checked={isCheckedStudent(student.id)}
                                        />
                                      </td>
                                      <td>{index + 1}</td>
                                      <td>{student.studentId}</td>
                                      <td>
                                        {student.firstName +
                                          ' ' +
                                          student.lastName}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div className='modal-footer'>
                          <button
                            type='button'
                            className='btn btn-default'
                            data-dismiss='modal'
                          >
                            Cancel
                          </button>
                          <button
                            type='button'
                            className='btn btn-danger'
                            onClick={handleAddStudents}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='clearfix' />
              </div>
              <div className='panel-wrapper collapse in'>
                <div className='panel-body'>
                  <div className='table-wrap'>
                    <div className='table-responsive'>
                      <table
                        id='datable_1'
                        className='table table-hover display  pb-30'
                      >
                        <thead>
                          <tr>
                            <th>
                              {currentRoom?.students && (
                                <input
                                  type='checkbox'
                                  name='checkbox'
                                  index='all'
                                  onChange={handleSelectAll}
                                />
                              )}
                            </th>
                            <th>#</th>
                            <th>Full name</th>
                            <th>Id</th>

                            <th>Face Data</th>
                            
                          </tr>
                        </thead>

                        <tbody>
                          {currentRoom &&
                            currentRoom.students &&
                            currentRoom.students.map((student, index) => (
                              <tr key={index}>
                                <td>
                                  <input
                                    type='checkbox'
                                    name='checkbox'
                                    index={student.id}
                                    onChange={handleSelect}
                                    checked={isChecked(student.id)}
                                  />
                                </td>
                                <td>{index + 1}</td>
                                <td>
                                  {student.firstName + ' ' + student.lastName}
                                </td>
                                <td>{student.studentId}</td>

                                <td>
                                  {student.images &&
                                  student.images.length > 0 &&
                                  student.images.some(
                                    (img) => img.type === 'face_data'
                                  ) ? (
                                    <span className='label label-success'>
                                      Uploaded
                                    </span>
                                  ) : (
                                    <span className='label label-danger'>
                                      Not added yet
                                    </span>
                                  )}
                                </td>
                                {/* <td>
                                  {student.images &&
                                  student.images.length > 0 &&
                                  student.images.some(
                                    (img) => img.type === 'id_card'
                                  ) ? (
                                    <span className='label label-success'>
                                      Uploaded
                                    </span>
                                  ) : (
                                    <span className='label label-danger'>
                                      Not added yet
                                    </span>
                                  )}
                                </td> */}
                              </tr>
                            ))}
                        </tbody>
                      </table>
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
  if (user.role === 'student') return renderStudentRoom()
  else return renderAdminRoom()
}

export default RoomDetail
