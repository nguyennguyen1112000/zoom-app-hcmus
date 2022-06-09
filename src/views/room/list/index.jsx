/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyRooms, getRooms } from '../../../services/api/room'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import swal from 'sweetalert'
import { authHeader, handleExpiredToken, tConv24 } from '../../../helper/utils'
import { Link } from 'react-router-dom'

const API_URL = process.env.REACT_APP_API_URL
function RoomList() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.currentUser)

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
    axios
      .post(
        `${API_URL}/rooms/import/zoom`,
        { access_token: user.zoom_access_token },
        authHeader()
      )
      .then((res) => {})
      .catch((err) => {
        console.log(err.response)
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
  const renderRooms = () => {
    return (
      <div className='container-fluid'>
        {/* Title */}
        <div className='row heading-bg'>
          <div className='col-lg-3 col-md-4 col-sm-4 col-xs-12'>
            <h5 className='txt-dark'>Rooms list</h5>
          </div>
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
          {/* /Breadcrumb */}
        </div>
        {/* /Title */}
        {/* Row */}
        <div className='row'>
          <div className='col-lg-12'>
            <div className='panel panel-default card-view'>
              <div className='panel-heading'>
                {select.length > 0 && (
                  <div className='pull-left button-list' onClick={handleDelete}>
                    <button class='btn btn-danger  btn-square'>
                      <span class='btn-label'>
                        <i class='fa fa-trash'></i>
                      </span>
                     
                    </button>
                  </div>
                )}
                <div className='pull-right button-list'>
                  {/* <button class='btn btn-default' onClick={handleImportZoom}>
                    Import Zoom
                  </button> */}
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
                  <Link to='/room/0/create_meeting'>
                    <button class='btn btn-primary btn-square'>
                      <span class='btn-label'>
                        <i class='fa fa-plus'></i>
                      </span>
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
                            <th>Link</th>
                            <th>Subject Code</th>
                            <th>Class Code</th>
                            <th>Exam date</th>
                            <th>No. Students</th>
                            <th>ACTION</th>
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
                                <a href={room.url}>Mở</a>
                              </td>
                              <td>{room.subject?.subjectCode}</td>
                              <td>{room.subject?.classCode}</td>
                              <td>
                                {' '}
                                {room.examDate && formatDate(room.examDate)}
                              </td>
                              <td>{room.students.length}</td>

                              <td>
                                <a
                                  href={`/room/edit/${room.id}`}
                                  className='text-inverse pr-10'
                                  title='Edit'
                                  data-toggle='tooltip'
                                >
                                  <i className='zmdi zmdi-edit txt-warning' />
                                </a>
                                <a
                                  href='javascript:void(0)'
                                  className='text-inverse'
                                  title='Delete'
                                  data-toggle='tooltip'
                                >
                                  <i className='zmdi zmdi-delete txt-danger' />
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
        {/* /Row */}
      </div>
    )
  }

  if (user.role !== 'student') return renderRooms()
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
                                    Enter room {" "}
                                    <i className='fa fa-sign-in'></i>
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
