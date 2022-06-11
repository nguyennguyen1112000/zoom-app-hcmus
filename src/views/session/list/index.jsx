/* eslint-disable no-undef */
import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {ToastContainer } from 'react-toastify'
import {
  formatTime,
} from '../../../helper/utils'
import 'react-toastify/dist/ReactToastify.css'
import { getIdentitySessions } from '../../../services/api/session'
import socketIOClient from 'socket.io-client'
const API_URL = process.env.REACT_APP_API_URL
function VerifySession() {
  const dispatch = useDispatch()
  const subjects = useSelector((state) => state.subject.subjects)
  const sessions = useSelector((state) => state.session.identity)
  const [reload, setReload] = useState(false)
   const socketRef = useRef()
  useEffect(() => {
    setTimeout(() => {
      $('#datable_1').DataTable().destroy()
      dispatch(getIdentitySessions())
    }, 2000)
  }, [reload])
  useEffect(() => {
    $('#datable_1').DataTable()
    socketRef.current = socketIOClient.connect(API_URL)

    socketRef.current.on('msgToClient', (data) => {
      setReload(!reload)
    })

    return () => {
      socketRef.current.disconnect()
    }
  }, [sessions, reload])

  return (
    <div className='container-fluid'>
      {/* Title */}
      <div className='row heading-bg'>
        <div className='col-lg-3 col-md-4 col-sm-4 col-xs-12'>
          <h5 className='txt-dark'>Sessions</h5>
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
                            <th>View detail</th>
                          </tr>
                        </thead>

                        <tbody>
                          {sessions?.map((session, index) => (
                            <tr key={index}>
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
                                {session.duration
                                  ? Math.round(session.duration / 1000 / 60) +
                                    ' minutes'
                                  : '--'}
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
                                  {session.accepted && (
                                    <span className='label label-success'>
                                      <i className='fa fa-check'></i>
                                    </span>
                                  )}
                                  {session.accepted === false && (
                                    <span className='label label-danger'>
                                      <i className='fa fa-times'></i>
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td>
                                {' '}
                                <a
                                  href={`/identity/sessions-room/${session.roomId}/${session.studentId}
                                `}
                                >
                                  View
                                </a>
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

      <ToastContainer />
    </div>
  )
}

export default VerifySession
