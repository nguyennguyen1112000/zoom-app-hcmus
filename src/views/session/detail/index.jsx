/* eslint-disable no-undef */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { SpinnerCircularFixed } from 'spinners-react'
import { authHeader, formatTime } from '../../../helper/utils'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getRoomIdentitySession } from '../../../services/api/session'
import { getRoom } from '../../../services/api/room'
const API_URL = process.env.REACT_APP_API_URL
function SessionRoomDetail() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [reload, setReload] = useState(false)
  let { id } = useParams()
  const sessions = useSelector((state) => state.session.identity)
  const room = useSelector((state) => state.room.currentRoom)
  useEffect(() => {
    setTimeout(() => {
      $('#datable_1').DataTable().destroy()
      if (id) {
        dispatch(getRoomIdentitySession(id))
        dispatch(getRoom(id))
      }
    }, 2000)
  }, [id, reload])
  useEffect(() => {
    $('#datable_1').DataTable()
  }, [sessions, reload])

  console.log('Session', sessions)

  const handleDelete = (e) => {
    e.preventDefault()

    axios
      .delete(`${API_URL}/subjects/${id}/students`, {
        data: select,
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      })
      .then((res) => {
        toast.success('Delete successfully', {
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
  return (
    <div className='container-fluid'>
      {/* Title */}
      <div className='row heading-bg'>
        {/* Breadcrumb */}
        <div className='col-lg-12 col-sm-8 col-md-8 col-xs-12'>
          <ol className='breadcrumb'>
            <li>
              <a href='/room'>HCMUSID</a>
            </li>
            <li>
              <a href='/identity/sessions-room'>
                <span>Room Session</span>
              </a>
            </li>
            <li className='active'>
              <span>{room?.name}</span>
            </li>
          </ol>
        </div>
        {/* /Breadcrumb */}
      </div>
      <div className='row'>
        <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12'>
          <div className='panel panel-default card-view pa-0'>
            <div className='panel-wrapper collapse in'>
              <div className='panel-body pa-0'>
                <div className='sm-data-box'>
                  <div className='container-fluid'>
                    <div className='row'>
                      <div className='col-xs-6 text-center pl-0 pr-0 data-wrap-left'>
                        <span className='txt-dark block counter'>
                          <span className='counter-anim'>
                            {room?.students?.length}
                          </span>
                        </span>
                        <span className='weight-500 uppercase-font block font-13'>
                          Students
                        </span>
                      </div>
                      <div className='col-xs-6 text-center  pl-0 pr-0 data-wrap-right'>
                        <i className='icon-user-following data-right-rep-icon txt-light-grey' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12'>
          <div className='panel panel-default card-view pa-0'>
            <div className='panel-wrapper collapse in'>
              <div className='panel-body pa-0'>
                <div className='sm-data-box'>
                  <div className='container-fluid'>
                    <div className='row'>
                      <div className='col-xs-6 text-center pl-0 pr-0 data-wrap-left'>
                        <span className='txt-dark block counter'>
                          <span className='counter-anim'>
                            {
                              sessions?.filter((s) => s.status === 'Passed')
                                .length
                            }
                          </span>
                        </span>
                        <span className='weight-500 uppercase-font block'>
                          Passed
                        </span>
                      </div>
                      <div className='col-xs-6 text-center  pl-0 pr-0 data-wrap-right'>
                        <i className='icon-control-rewind data-right-rep-icon txt-light-grey' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12'>
          <div className='panel panel-default card-view pa-0'>
            <div className='panel-wrapper collapse in'>
              <div className='panel-body pa-0'>
                <div className='sm-data-box'>
                  <div className='container-fluid'>
                    <div className='row'>
                      <div className='col-xs-6 text-center pl-0 pr-0 data-wrap-left'>
                        <span className='txt-dark block counter'>
                          <span className='counter-anim'>
                            {
                              sessions?.filter(
                                (s) => s.status === 'Not start yet'
                              ).length
                            }
                          </span>
                        </span>
                        <span className='weight-500 uppercase-font block'>
                          Not start yet
                        </span>
                      </div>
                      <div className='col-xs-6 text-center  pl-0 pr-0 data-wrap-right'>
                        <i className='icon-layers data-right-rep-icon txt-light-grey' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12'>
          <div className='panel panel-default card-view pa-0'>
            <div className='panel-wrapper collapse in'>
              <div className='panel-body pa-0'>
                <div className='sm-data-box'>
                  <div className='container-fluid'>
                    <div className='row'>
                      <div className='col-xs-6 text-center pl-0 pr-0 data-wrap-left'>
                        <span className='txt-dark block counter'>
                          <span className='counter-anim'>
                            {
                              sessions?.filter((s) => s.status === 'Failed')
                                .length
                            }
                          </span>
                        </span>
                        <span className='weight-500 uppercase-font block'>
                          Failed
                        </span>
                      </div>
                      <div className='col-xs-6 text-center  pl-0 pr-0 pt-25  data-wrap-right'>
                        <div
                          id='sparkline_4'
                          style={{
                            width: '100px',
                            overflow: 'hidden',
                            margin: '0px auto'
                          }}
                        >
                          <canvas
                            width={115}
                            height={50}
                            style={{
                              display: 'inline-block',
                              width: '115px',
                              height: '50px',
                              verticalAlign: 'top'
                            }}
                          />
                        </div>
                      </div>
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
                          <th>#</th>

                          <th>Student</th>

                          <th>Started at</th>
                          <th>Duration</th>
                          <th>Credibility</th>
                          <th>Status</th>
                          <th>Flag</th>
                          <th>Session Detail</th>
                        </tr>
                      </thead>

                      <tbody>
                        {sessions?.map((session, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>

                            <td>
                              <a href={`/student/${session.studentId}`}>
                                {' '}
                                <i className='fa fa-user'></i>
                                {session.studentId}
                              </a>
                            </td>

                            <td>
                              {session.created_at
                                ? formatTime(new Date(session.created_at))
                                : '--'}
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
                                    {session.credibility &&
                                      Math.round(session.credibility * 100) +
                                        '%'}
                                  </div>
                                </div>
                              ) : (
                                '--'
                              )}
                            </td>
                            <td>
                              {session.status === 'Not start yet' && (
                                <span className='label label-default'>
                                  {session.status}
                                </span>
                              )}
                              {session.status === 'Face passed' && (
                                <span className='label label-warning'>
                                  {session.status}
                                </span>
                              )}
                              {session.status === 'Passed' && (
                                <span className='label label-success'>
                                  {session.status}
                                </span>
                              )}
                              {session.status === 'Failed' && (
                                <span className='label label-danger'>
                                  {session.status}
                                </span>
                              )}
                            </td>

                            <td>
                              {}
                              <div className='buttion-list'>
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
                              </div>
                            </td>
                            <td>
                              <a
                                href={`/identity/sessions-room/${room?.id}/${session.studentId}
                                `}
                              >
                                {' '}
                                View
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
      <ToastContainer />
    </div>
  )
}

export default SessionRoomDetail
