/* eslint-disable no-undef */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { authHeader, formatDate, formatTime, tConv24 } from '../../../helper/utils'
import { getAllSubjects } from '../../../services/api/subject'
import 'react-toastify/dist/ReactToastify.css'
import { SpinnerCircularFixed } from 'spinners-react'
import { getIdentitySessions } from '../../../services/api/session'
import { Link } from 'react-router-dom'

function VerifySession() {
  const dispatch = useDispatch()
  const subjects = useSelector((state) => state.subject.subjects)
  const sessions = useSelector((state) => state.session.identity)
  console.log(sessions)
  const [reload, setReload] = useState(false)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      $('#datable_1').DataTable().destroy()
      dispatch(getIdentitySessions())
    }, 2000)
  }, [reload])
  useEffect(() => {
    $('#datable_1').DataTable()
  }, [sessions, reload])

  const API_URL = process.env.REACT_APP_API_URL
  const downloadTemplate = (e) => {
    e.preventDefault()
    const downloadLink = `${API_URL}/subjects/template`
    const a = document.createElement('a')
    a.href = downloadLink
    a.click()
  }
  const [select, setSelect] = useState([])
  const handleSelect = (e) => {
    const index = e.currentTarget.getAttribute('index')
    const checked = e.target.checked
    if (checked) setSelect([...select, index])
    else setSelect(select.filter((x) => x !== index))
  }
  const handleSelectAll = (e) => {
    const checked = e.target.checked
    if (checked) setSelect(sessions.map((s) => s.id))
    else setSelect([])
  }
  const isChecked = (index) => {
    return select.includes(index)
  }
  const handleDelete = (e) => {
    e.preventDefault()

    axios
      .delete(`${API_URL}/subjects`, {
        data: select,
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      })
      .then((res) => {
        toast.success('Xóa thành công', {
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
        toast.error(err.response.data.message, {
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

  const uploadFile = (e) => {
    const formData = new FormData()
    //console.log('e.target.value', e.target.file)

    formData.append('file', e.target.files[0])
    axios
      .post(`${API_URL}/subjects/upload`, formData, authHeader())
      .then((res) => {
        e.target.value = null
        toast.success('Đăng tải thành công', {
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
  const handleSync = (e) => {
    setLoading(true)
    axios
      .post(`${API_URL}/moodles/sync`, null, authHeader())
      .then((res) => {
        setReload(!reload)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }

  return (
    <div className='container-fluid'>
      {/* Title */}
      <div className='row heading-bg'>
        <div className='col-lg-3 col-md-4 col-sm-4 col-xs-12'>
          <h5 className='txt-dark'>Identity Sessions</h5>
        </div>
        {/* Breadcrumb */}
        <div className='col-lg-9 col-sm-8 col-md-8 col-xs-12'>
          <ol className='breadcrumb'>
            <li>
              <a href='index.html'>HCMUSID</a>
            </li>

            <li className='active'>
              <span>Identity sessions</span>
            </li>
          </ol>
        </div>
        {/* /Breadcrumb */}
      </div>
      {/* /Title */}
      {/* Row */}
      <div className='row'>
        <div className='col-lg-12'>
          <div className='panel panel-default card-view'>
            <div className='panel-heading'>
              {select.length > 0 && (
                <div className='pull-left button-list'>
                  <button
                    class='btn btn-danger btn-square'
                    onClick={handleDelete}
                  >
                    <span class='btn-label'>
                      <i class='fa fa-trash'></i>
                    </span>
                  </button>
                </div>
              )}
              <div className='pull-right button-list'>
                <button
                  class='btn btn-success btn-square btn-outline'
                  onClick={downloadTemplate}
                >
                  <span class='btn-label'>
                    <i class='fa fa-download'></i>
                  </span>
                </button>
                <button class='btn btn-danger btn-square btn-outline fileupload'>
                  <span class='btn-label'>
                    <i class='fa fa-upload'></i>
                  </span>

                  <input
                    id='file_upload'
                    type='file'
                    className='upload'
                    onChange={uploadFile}
                  />
                </button>
              </div>
              <div className='clearfix' />
            </div>
            <div className='panel-wrapper collapse in'>
              <div className='panel-body'>
                <div className='table-wrap'>
                  {subjects && (
                    <div className='table-responsive'>
                      <table
                        id='datable_1'
                        className='table table-hover display  pb-30'
                      >
                        <thead>
                          <tr>
                            <th>
                              {subjects && (
                                <input
                                  type='checkbox'
                                  name='checkbox'
                                  index='all'
                                  onChange={handleSelectAll}
                                />
                              )}
                            </th>
                            <th>#</th>
                            <th>Room </th>
                            <th>Subject </th>
                            <th>Student</th>
                            <th>Proctor</th>

                            <th>Started at</th>
                            <th>Duration</th>
                            <th>Credibility</th>
                            <th>Status</th>
                            <th>Flag</th>
                          </tr>
                        </thead>

                        <tbody>
                          {sessions?.map((session, index) => (
                            <tr key={index}>
                              <td>
                                <input
                                  type='checkbox'
                                  name='checkbox'
                                  index={session.id}
                                  onChange={handleSelect}
                                  checked={isChecked(session.id)}
                                />
                              </td>
                              <td>{index + 1}</td>
                              <td>
                                <a href={`/room/${session.room?.id}`}>
                                  {session.room?.name}
                                </a>
                              </td>
                              <td>
                                <a
                                  href={`/subject/${session.room?.subject?.id}`}
                                >
                                  {session.room?.subject?.name}
                                </a>
                              </td>
                              <td>
                                <a href={`/student/${session.studentId}`}>
                                  {' '}
                                  <i className='fa fa-user'></i>
                                  {session.studentId}
                                </a>
                              </td>
                              <td>
                                {session.room?.proctors?.map((proctor) => (
                                  <>
                                    <span className='label label-default'>
                                      {proctor.firstName +
                                        ' ' +
                                        proctor.lastName}
                                    </span>
                                    <br />
                                  </>
                                ))}
                              </td>
                              <td>
                                {formatTime(new Date(session.created_at))}
                              </td>
                              <td>
                                {Math.round(session.duration / 1000 / 60) +
                                  ' minutes'}
                              </td>
                              <td>
                                {Math.round(session.credibility * 100) / 100}
                              </td>
                              <td>
                                {session.faceStatus && session.idStatus && (
                                  <span className='label label-primary'>
                                    Pass
                                  </span>
                                )}
                                {session.faceStatus && !session.idStatus && (
                                  <span className='label label-warning'>
                                    Face Pass
                                  </span>
                                )}
                                {!session.faceStatus && !session.idStatus && (
                                  <span className='label label-primary'>
                                    Fail
                                  </span>
                                )}
                              </td>

                              <td>
                                <div className='buttion-list'>
                                  <button className='btn-primary'>
                                    Accept
                                  </button>
                                  <button className='btn-danger'>Reject</button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='spinner-loading'>
        <SpinnerCircularFixed
          size={100}
          thickness={200}
          color='#2986CC'
          enabled={loading}
        />
      </div>
      <ToastContainer />
    </div>
  )
}

export default VerifySession
