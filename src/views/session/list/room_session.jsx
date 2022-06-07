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

import { getRooms } from '../../../services/api/room'
import { SpinnerCircularFixed } from 'spinners-react'

function RoomSession() {
  const dispatch = useDispatch()
  const roomList = useSelector((state) => state.room.roomList)

  const [reload, setReload] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      $('#datable_1').DataTable().destroy()
      dispatch(getRooms())
    }, 3000)
  }, [reload])
  useEffect(() => {
    $('#datable_1').DataTable()
  }, [reload, roomList])
  const [loading, setLoading] = useState(false)
  const API_URL = process.env.REACT_APP_API_URL
  const startSession = (e) => {
    const id = e.currentTarget.getAttribute('index')
    setLoading(true)
    axios
      .put(`${API_URL}/rooms/${id}/start`, null, authHeader())
      .then((res) => {
        setReload(!reload)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
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
  const stopSession = (e) => {
    const id = e.currentTarget.getAttribute('index')
    setLoading(true)
    axios
      .put(`${API_URL}/rooms/${id}/stop`, null, authHeader())
      .then((res) => {
        setReload(!reload)
        setLoading(false)
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
        setLoading(false)
      })
  }
  return (
    <div className='container-fluid'>
      {/* Title */}
      <div className='row heading-bg'>
        <div className='col-lg-3 col-md-4 col-sm-4 col-xs-12'>
          <h5 className='txt-dark'>Room Sessions</h5>
        </div>
        {/* Breadcrumb */}
        <div className='col-lg-9 col-sm-8 col-md-8 col-xs-12'>
          <ol className='breadcrumb'>
            <li>
              <a href='index.html'>HCMUSID</a>
            </li>

            <li className='active'>
              <span>Room sessions</span>
            </li>
          </ol>
        </div>
        {/* /Breadcrumb */}
      </div>
      {/* <div className='row'>
        <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12'>
          <div className='panel panel-default card-view pa-0'>
            <div className='panel-wrapper collapse in'>
              <div className='panel-body pa-0'>
                <div className='sm-data-box'>
                  <div className='container-fluid'>
                    <div className='row'>
                      <div className='col-xs-6 text-center pl-0 pr-0 data-wrap-left'>
                        <span className='txt-dark block counter'>
                          <span className='counter-anim'>13</span>
                        </span>
                        <span className='weight-500 uppercase-font block font-13'>
                          Rooms
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
                          <span className='counter-anim'>46.41</span>%
                        </span>
                        <span className='weight-500 uppercase-font block'>
                          bounce rate
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
                          <span className='counter-anim'>4,054,876</span>
                        </span>
                        <span className='weight-500 uppercase-font block'>
                          pageviews
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
                          <span className='counter-anim'>46.43</span>%
                        </span>
                        <span className='weight-500 uppercase-font block'>
                          growth rate
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
      </div> */}
      <div className='row'>
        <div className='col-lg-12'>
          <div className='panel panel-default card-view'>
            <div className='panel-wrapper collapse in'>
              <div className='panel-body'>
                <div className='table-wrap'>
                  {roomList && (
                    <div className='table-responsive'>
                      <table
                        id='datable_1'
                        className='table table-hover display  pb-30'
                      >
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Room name</th>
                            <th>Room Code</th>

                            <th>Subject Code</th>
                            <th>Proctor</th>
                            <th>Class Code</th>
                            <th>No. Students</th>
                            <th>Config type</th>
                            <th>Check-in time</th>
                            <th>Status</th>

                            <th>Start/Stop session</th>
                            <th>View session</th>
                          </tr>
                        </thead>

                        <tbody>
                          {roomList?.map((room, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                <a href={`/room/${room.id}`}>{room.name}</a>
                              </td>
                              <td> {room.roomCode}</td>

                              <td>{room.subject.subjectCode}</td>
                              <td>
                                {room?.proctors?.map((proctor) => (
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
                              <td>{room.subject.classCode}</td>

                              <td>{room.students.length}</td>
                              <td>{room.checkInConfigType}</td>
                              <td>
                                {room.checkInStartTime
                                  ? tConv24(
                                      `${(
                                        '0' +
                                        new Date(
                                          room.checkInStartTime
                                        ).getHours()
                                      ).slice(-2)}:${(
                                        '0' +
                                        new Date(
                                          room.checkInStartTime
                                        ).getMinutes()
                                      ).slice(-2)}`
                                    )
                                  : '??'}
                                -
                                {room.checkInEndTime
                                  ? tConv24(
                                      `${(
                                        '0' +
                                        new Date(room.checkInEndTime).getHours()
                                      ).slice(-2)}:${(
                                        '0' +
                                        new Date(
                                          room.checkInEndTime
                                        ).getMinutes()
                                      ).slice(-2)}`
                                    )
                                  : '??'}{' '}
                                (
                                {room.checkInStartTime &&
                                  formatDate(new Date(room.checkInStartTime))}
                                )
                              </td>
                              <td>
                                {room.status === 'Not start yet' && (
                                  <span className='label label-primary'>
                                    Not start yet
                                  </span>
                                )}
                                {room.status === 'On boarding' && (
                                  <span className='label label-warning'>
                                    On boarding
                                  </span>
                                )}
                                {room.status === 'Stopped' && (
                                  <span className='label label-danger'>
                                    Stopped
                                  </span>
                                )}
                              </td>
                              <td>
                                {room.checkInConfigType === 'manual' &&
                                  (room.status === 'Not start yet' ||
                                    room.status === 'Stopped') && (
                                    <button
                                      className='btn btn-primary btn-square'
                                      index={room.id}
                                      onClick={startSession}
                                    >
                                      <i className='fa fa-play'></i>{' '}
                                    </button>
                                  )}
                                {room.checkInConfigType === 'manual' &&
                                  room.status === 'On boarding' && (
                                    <button
                                      className='btn btn-danger btn-square'
                                      index={room.id}
                                      onClick={stopSession}
                                    >
                                      <i className='fa fa-pause'></i>{' '}
                                    </button>
                                  )}
                              </td>
                              <td>
                                <a href={`/identity/sessions-room/${room.id}`}>
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
      <div className='spinner-loading'>
        <SpinnerCircularFixed
          size={100}
          thickness={150}
          color='#2986CC'
          enabled={loading}
        />
      </div>
      <ToastContainer />
    </div>
  )
}

export default RoomSession
