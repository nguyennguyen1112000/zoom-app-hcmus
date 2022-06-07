/* eslint-disable no-undef */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import {
  authHeader,
  formatDate,
  formatTime,
  tConv24
} from '../../../helper/utils'
import 'react-toastify/dist/ReactToastify.css'

import { getRoom, getRooms } from '../../../services/api/room'
import { useParams } from 'react-router-dom'
import { getStudentdentitySession } from '../../../services/api/session'
import { Redirect } from 'react-router-dom'

function StudentSessionDetail() {
  const dispatch = useDispatch()
  const sessions = useSelector((state) => state.session.identity)
  const room = useSelector((state) => state.room.currentRoom)
  let { id, studentId } = useParams()
  const [reload, setReload] = useState(false)
  const [note, setNote] = useState('')
  const [redirect, setRedirect] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [accepted, setAccept] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      $('#datable_1').DataTable().destroy()
      if (id && studentId) {
        dispatch(getStudentdentitySession(id, studentId))
        dispatch(getRoom(id))
      }
    }, 2000)
  }, [reload])
  useEffect(() => {
    $('#datable_1').DataTable()
    if (sessions) {
      if (sessions.length > 0) {
        setNote(sessions[0].note)
        setAccept(sessions[0].accepted)
      }
    }
  }, [reload, sessions])

  const API_URL = process.env.REACT_APP_API_URL
  const handleAccept = (e) => {
    e.preventDefault()
    axios
      .put(
        `${API_URL}/identity-record/${id}/${studentId}`,
        { note, accepted: true },
        authHeader()
      )
      .then((res) => {
        setRedirect(true)
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
  const handleReject = (e) => {
    e.preventDefault()
    axios
      .put(
        `${API_URL}/identity-record/${id}/${studentId}`,
        { note, accepted: false },
        authHeader()
      )
      .then((res) => {
        setRedirect(true)
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
  if (redirect) {
    return <Redirect to={`/identity/sessions-room/${id}`} />
  }

  const renderViewMode = () => {
    if (accepted === null)
      return (
        <form>
          <div className='form-group'>
            <label className='control-label mb-10 text-left'>Note</label>
            <textarea
              className='form-control'
              rows={5}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <div className='form-actions'>
            <button
              className='btn btn-success btn-icon left-icon mr-10 pull-left'
              onClick={handleAccept}
            >
              <i className='fa fa-check' /> <span>Accept</span>
            </button>
            <button
              type='button'
              className='btn btn-danger pull-left'
              onClick={handleReject}
            >
              Reject
            </button>
            <div className='clearfix' />
          </div>
        </form>
      )
    else {
      if (!editMode)
        return (
          <div
            className={`panel ${
              accepted ? 'panel-success' : 'panel-danger'
            } contact-card card-view`}
          >
            <div className='panel-heading'>
              <div className='pull-left'>
                <div className='pull-left user-detail-wrap'>
                  <span className='block card-user-name'>{studentId}</span>
                  <span className='block card-user-desn'>
                    {accepted ? 'PASS' : 'FAILED'}
                  </span>
                </div>
              </div>
              <div className='pull-right'>
                <a
                  className='pull-left inline-block mr-15'
                  href='/'
                  onClick={(e) => {
                    e.preventDefault()
                    setEditMode(true)
                  }}
                >
                  <i className='zmdi zmdi-edit txt-light' />
                </a>
              </div>
              <div className='clearfix' />
            </div>
            <div className='panel-wrapper collapse in'>
              <div className='panel-body row'>
                <div className='user-others-details pl-15 pr-15'>
                  <div className='mb-15'>
                    <i className='fa fa-sticky-note inline-block mr-10' />
                    <span className='inline-block txt-dark'>{note}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      return (
        <form>
          <div className='form-group'>
            <label className='control-label mb-10 text-left'>Note</label>
            <textarea
              className='form-control'
              rows={5}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <div className='form-actions'>
            <button
              className='btn btn-success btn-icon left-icon mr-10 pull-left'
              onClick={handleAccept}
            >
              <i className='fa fa-check' /> <span>Accept</span>
            </button>
            <button
              type='button'
              className='btn btn-danger pull-left mr-10'
              onClick={handleReject}
            >
              Reject
            </button>
            <button
              className='btn btn-default btn-icon left-icon mr-10 pull-left'
              onClick={(e) => {
                e.preventDefault()
                setEditMode(false)
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )
    }
  }
  return (
    <div className='container-fluid'>
      {/* Title */}
      <div className='row heading-bg'>
        <div className='col-lg-3 col-md-4 col-sm-4 col-xs-12'>
          <h5 className='txt-dark'>Session history</h5>
        </div>
        {/* Breadcrumb */}
        <div className='col-lg-9 col-sm-8 col-md-8 col-xs-12'>
          <ol className='breadcrumb'>
            <li>
              <a href='index.html'>HCMUSID</a>
            </li>
            <li>
              <a href='/identity/sessions-room'>
                <span>Room session</span>
              </a>
            </li>
            <li>
              <a href={`/identity/sessions-room/${room?.id}`}>
                <span>{room?.name}</span>
              </a>
            </li>
            <li className='active'>
              <span>{studentId}</span>
            </li>
          </ol>
        </div>
        {/* /Breadcrumb */}
      </div>
      {/* /Title */}
      {/* Row */}
      <div className='row'>
        <div className='col-md-12'>
          <div className='panel panel-default card-view'>
            <div className='panel-wrapper collapse in'>
              <div className='panel-body'>
                <div className='form-wrap'>{renderViewMode()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-12'>
          <div className='panel panel-default card-view'>
            <div className='panel-wrapper collapse in'>
              <div className='panel-body row'>
                <div className='table-wrap'>
                  <div className='table-responsive'>
                    <table
                      className='table display responsive product-overview mb-30'
                      id='myTable'
                    >
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Id</th>
                          <th>Face recognition</th>
                          <th>Id verification</th>
                          <th>Face image</th>
                          <th>Id image</th>
                          <th width='15%'>Credibility</th>
                          <th>Start time</th>
                          <th>Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sessions?.map((session, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{session.id}</td>
                            <td>
                              {session.faceStatus ? (
                                <span className='label label-success'>
                                  Pass
                                </span>
                              ) : (
                                <span className='label label-danger'>
                                  Failed
                                </span>
                              )}
                            </td>
                            <td>
                              {session.idStatus ? (
                                <span className='label label-success'>
                                  Pass
                                </span>
                              ) : (
                                <span className='label label-danger'>
                                  Failed
                                </span>
                              )}
                            </td>
                            <td>
                              {session.faceImage && (
                                <a
                                  href={`${session?.faceImage.imageUrl}`}
                                  target='_blank'
                                  rel='noopener noreferrer'
                                >
                                  <img
                                    src={session?.faceImage.fetchUrl}
                                    alt='face_recognition_image'
                                    width={80}
                                    referrerpolicy='no-referrer'
                                  />
                                </a>
                              )}
                            </td>
                            <td>
                              {session?.cardImage && (
                                <a
                                  href={`${session?.cardImage.imageUrl}`}
                                  target='_blank'
                                  rel='noopener noreferrer'
                                >
                                  <img
                                    src={session?.cardImage.fetchUrl}
                                    alt='face_recognition_image'
                                    width={80}
                                    referrerpolicy='no-referrer'
                                  />
                                </a>
                              )}
                            </td>
                            <td>
                              {session.credibility ? (
                                <div className='progress progress-lg'>
                                  <div
                                    className='progress-bar progress-bar-danger'
                                    style={{
                                      width: `${Math.round(
                                        session.credibility * 100
                                      )}%`
                                    }}
                                    role='progressbar'
                                  >
                                    {Math.round(session.credibility * 100) +
                                      '%'}
                                  </div>
                                </div>
                              ) : (
                                '--'
                              )}
                            </td>
                            <td>{formatTime(new Date(session.created_at))}</td>
                            <td>
                              {session.duration
                                ? Math.round(session.duration / 1000 / 60) +
                                  ' minutes'
                                : '--'}
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
      {/* /Row */}
    </div>
  )
}

export default StudentSessionDetail
