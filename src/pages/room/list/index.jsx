/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyRooms, getRooms } from '../../../services/api/room'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import swal from 'sweetalert'
import { authHeader, handleExpiredToken } from '../../../helper/utils'
import { Link } from 'react-router-dom'
import { SpinnerDotted } from 'spinners-react'

const API_URL = process.env.REACT_APP_API_URL
function RoomList() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.currentUser)
  const [loading, setLoading] = useState(false)
  const roomList = useSelector((state) => state.room.roomList)
  const [reload, setReload] = useState(false)
  const [select, setSelect] = useState([])
  useEffect(() => {
    setTimeout(() => {
      $('#datable_1').DataTable().destroy()
      if (user.role === 'student') {
        dispatch(getMyRooms())
      } else dispatch(getRooms())
    }, 2000)
  }, [reload])
  useEffect(() => {
    $('#datable_1').DataTable()
  }, [roomList, reload])
  const downloadTemplate = (e) => {
    e.preventDefault()
    const downloadLink = `${API_URL}/rooms/template`
    const a = document.createElement('a')
    a.href = downloadLink
    a.click()
  }
  /************* Import from zoom *********** */
  const handleImportZoom = () => {
    setLoading(true)
    axios
      .post(`${API_URL}/rooms/import/zoom`, null, authHeader())
      .then((res) => {
        setLoading(false)
        setReload(!reload)
      })
      .catch((err) => {
        setLoading(false)
        handleExpiredToken(err, swal)
      })
  }
  /************* Xóa *********** */
  const handleSelect = (e) => {
    const index = e.currentTarget.getAttribute('index')
    const checked = e.target.checked
    if (checked) setSelect([...select, parseInt(index)])
    else setSelect(select.filter((x) => x != parseInt(index)))
  }
  const handleSelectAll = (e) => {
    const checked = e.target.checked
    if (checked) setSelect(roomList.map((room) => room.id))
    else setSelect([])
  }
  const isChecked = (index) => {
    return select.includes(index)
  }
  const handleDelete = (e) => {
    e.preventDefault()
    swal({
      title: 'Are you sure?',
      text: 'This record and it`s details will be permanantly deleted!',
      icon: 'warning',
      buttons: ['Cancel', 'Yes']
    }).then(function (value) {
      if (value) {
        axios
          .delete(`${API_URL}/rooms`, {
            data: select,
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem('token')
              )}`
            }
          })
          .then((res) => {
            setSelect([])
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
    })
  }
  /************* Upload file *********** */

  const uploadFile = (e) => {
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    axios
      .post(`${API_URL}/rooms/upload`, formData, authHeader())
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
  const renderAdminRooms = () => {
    return (
      <div className='container-fluid'>
        {/* Title */}
        <div className='row heading-bg'>
          <div className='col-lg-3 col-md-4 col-sm-4 col-xs-12'></div>
          {/* Breadcrumb */}
          <div className='col-lg-9 col-sm-8 col-md-8 col-xs-12'>
            <ol className='breadcrumb'>
              <li>
                <a href='/room'>HCMUSID</a>
              </li>

              <li className='active'>
                <span>Rooms</span>
              </li>
            </ol>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='panel panel-default card-view'>
              <div className='panel-heading'>
                <div className='pull-left button-list'>
                  {select.length > 0 && (
                    <button
                      class='btn btn-danger  btn-square'
                      onClick={handleDelete}
                    >
                      <span class='btn-label'>
                        <i class='fa fa-trash'></i>
                      </span>
                    </button>
                  )}
                  {select.length === 1 && (
                    <Link to={`/room/update/${select[0]}`}>
                      <button class='btn btn-default  btn-square'>
                        <span class='btn-label'>
                          <i class='fa fa-pencil'></i>
                        </span>
                      </button>
                    </Link>
                  )}
                </div>

                <div className='pull-right button-list'>
                  <button
                    class='btn btn-primary btn-outline btn-square'
                    onClick={handleImportZoom}
                  >
                    <img src='/img/icons8-zoom.svg' width={30} />
                  </button>
                  <button
                    class='btn btn-success btn-square btn-outline'
                    onClick={downloadTemplate}
                  >
                    <span class='btn-label'>
                      <i class='fa fa-download'></i>
                    </span>
                  </button>
                  <button class='btn btn-danger btn-outline btn-square fileupload'>
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
                  <Link to='/room/0/create'>
                    <button class='btn btn-primary btn-square'>
                      <span class='btn-label'>
                        <i class='fa fa-plus'></i>
                      </span>{' '}
                    </button>
                  </Link>
                  <Link to='/room/0/create_meeting'>
                    <button class='btn btn-success btn-square'>
                      <span class='btn-label'>
                        <i class='fa fa-calendar'></i>
                      </span>{' '}
                    </button>
                  </Link>
                </div>
                <div className='clearfix' />
              </div>
              <div className='panel-wrapper collapse in'>
                <div className='panel-body'>
                  <div className='table-wrap mb-0'>
                    <div className='table-responsive'>
                      <table
                        id='datable_1'
                        className='table table-hover display  pb-30'
                      >
                        <thead>
                          <tr>
                            <th>
                              {roomList && (
                                <input
                                  type='checkbox'
                                  name='checkbox'
                                  index='all'
                                  onChange={handleSelectAll}
                                />
                              )}
                            </th>
                            <th>#</th>

                            <th>Room name</th>
                            <th>Room Code</th>
                            <th>ZoomId </th>
                            <th>Passcode</th>
                            <th>Join URL</th>
                            <th>Subject</th>
                            <th>Class Code</th>
                            <th>No. Students</th>
                          </tr>
                        </thead>

                        <tbody>
                          {roomList?.map((room, index) => (
                            <tr>
                              <td>
                                <input
                                  type='checkbox'
                                  name='checkbox'
                                  index={room.id}
                                  onChange={handleSelect}
                                  checked={isChecked(room.id)}
                                />
                              </td>
                              <td>{index + 1}</td>
                              <td>
                                <a href={`/room/${room.id}`}>{room.name}</a>
                              </td>
                              <td> {room.roomCode}</td>
                              <td>{room.zoomId}</td>
                              <td>{room.passcode}</td>
                              <td>
                                <button
                                  style={{
                                    border: 'none',
                                    background: 'none'
                                  }}
                                  onClick={() => {
                                    navigator.clipboard.writeText(room.url)
                                    swal({
                                      text: 'Copied to clipboard',
                                      button: false
                                    })
                                  }}
                                >
                                  Copy <i className='fa fa-copy'></i>
                                </button>
                              </td>
                              <td>{room.subject?.name}</td>
                              <td>{room.subject?.classCode}</td>

                              <td>{room.students?.length}</td>
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
        <div className='spinner-loading'>
          <SpinnerDotted
            size={50}
            thickness={150}
            color='#2986CC'
            enabled={loading}
          />
          {loading && 'Importing...'}
        </div>
      </div>
    )
  }
  const renderProctorRooms = () => {
    return (
      <div className='container-fluid'>
        {/* Title */}
        <div className='row heading-bg'>
          <div className='col-lg-3 col-md-4 col-sm-4 col-xs-12'></div>
          {/* Breadcrumb */}
          <div className='col-lg-9 col-sm-8 col-md-8 col-xs-12'>
            <ol className='breadcrumb'>
              <li>
                <a href='/room'>HCMUSID</a>
              </li>

              <li className='active'>
                <span>Rooms</span>
              </li>
            </ol>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='panel panel-default card-view'>
              <div className='panel-wrapper collapse in'>
                <div className='panel-body'>
                  <div className='table-wrap mb-0'>
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
                            <th>ZoomId </th>
                            <th>Passcode</th>
                            <th>Join URL</th>
                            <th>Subject</th>
                            <th>Class Code</th>
                            <th>No. Students</th>
                          </tr>
                        </thead>

                        <tbody>
                          {roomList?.map((room, index) => (
                            <tr>
                              <td>{index + 1}</td>
                              <td>
                                <a href={`/room/${room.id}`}>{room.name}</a>
                              </td>
                              <td> {room.roomCode}</td>
                              <td>{room.zoomId}</td>
                              <td>{room.passcode}</td>
                              <td>
                                <button
                                  style={{
                                    border: 'none',
                                    background: 'none'
                                  }}
                                  onClick={() => {
                                    navigator.clipboard.writeText(room.url)
                                    swal({
                                      text: 'Copied to clipboard',
                                      button: false
                                    })
                                  }}
                                >
                                  Copy <i className='fa fa-copy'></i>
                                </button>
                              </td>
                              <td>{room.subject?.name}</td>
                              <td>{room.subject?.classCode}</td>

                              <td>{room.students?.length}</td>
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

  if (user.role === 'admin') return renderAdminRooms()
  else if (user.role === 'proctor') return renderProctorRooms()
  else
    return (
      <div className='container-fluid'>
        {/* Title */}
        <div className='row heading-bg'>
          <div className='col-lg-3 col-md-4 col-sm-4 col-xs-12'></div>
          {/* Breadcrumb */}
          <div className='col-lg-9 col-sm-8 col-md-8 col-xs-12'>
            <ol className='breadcrumb'>
              <li>
                <a href='index.html'>HCMUSID</a>
              </li>

              <li className='active'>
                <span>Rooms</span>
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
                  <div className='table-wrap mb-0'>
                    <div className='table-responsive'>
                      <table
                        id='datable_1'
                        className='table table-hover display  pb-30'
                      >
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Room name</th>
                            <th>Room code</th>
                            <th>ZoomId </th>
                            <th>Passcode</th>
                            <th>Link Zoom</th>
                            <th>Subject</th>
                          </tr>
                        </thead>

                        <tbody>
                          {roomList &&
                            roomList.map((room, index) => (
                              <tr>
                                <td>{index + 1}</td>
                                <td>
                                  <a href={`/room/${room.id}`}>{room.name}</a>
                                </td>
                                <td>{room.roomCode}</td>
                                <td>{room.zoomId}</td>
                                <td>
                                  {room.passcode} <i className='fa fa-eye'></i>
                                </td>
                                <td>
                                  <a href={room.url}>
                                    Enter room <i className='fa fa-sign-in'></i>
                                  </a>
                                </td>
                                <td>{room.subject?.name}</td>
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

export default RoomList
