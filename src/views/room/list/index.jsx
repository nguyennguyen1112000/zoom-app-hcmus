/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyRooms, getRooms } from '../../../services/api/room'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { authHeader, tConv24 } from '../../../helper/utils'
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
    console.log('selects', select)

    axios
      .delete(
        `${API_URL}/rooms`,
        {
          data: select,
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        },
      )
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
      .post(`${API_URL}/rooms/upload`, formData, authHeader())
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
  const renderRooms = () => {
    return (
      <div className='container-fluid'>
        {/* Title */}
        <div className='row heading-bg'>
          <div className='col-lg-3 col-md-4 col-sm-4 col-xs-12'>
            <h5 className='txt-dark'>Danh sách phòng thi</h5>
          </div>
          {/* Breadcrumb */}
          <div className='col-lg-9 col-sm-8 col-md-8 col-xs-12'>
            <ol className='breadcrumb'>
              <li>
                <a href='index.html'>HCMUSID</a>
              </li>

              <li className='active'>
                <span>Danh sách phòng thi</span>
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
                    <button class='btn btn-danger btn-lable-wrap left-label'>
                      <span class='btn-label'>
                        <i class='fa fa-trash'></i>
                      </span>
                      <span class='btn-text' onClick={handleDelete}>
                        Xóa đã chọn
                      </span>
                    </button>
                  </div>
                )}
                <div className='pull-right button-list'>
                  <button class='btn btn-success btn-lable-wrap left-label'>
                    <span class='btn-label'>
                      <i class='fa fa-download'></i>
                    </span>
                    <span class='btn-text' onClick={downloadTemplate}>
                      template
                    </span>
                  </button>
                  <button class='btn btn-danger btn-lable-wrap left-label fileupload'>
                    <span class='btn-label'>
                      <i class='fa fa-upload'></i>
                    </span>
                    <span class='btn-text' for='file_upload'>
                      Tải lên file
                    </span>
                    <input
                      id='file_upload'
                      type='file'
                      className='upload'
                      onChange={uploadFile}
                    />
                  </button>
                  <button class='btn btn-primary btn-lable-wrap left-label'>
                    <span class='btn-label'>
                      <i class='fa fa-plus'></i>{' '}
                    </span>
                    <span class='btn-text'>Thêm phòng thi</span>
                  </button>
                  <button class='btn btn-primary btn-lable-wrap left-label'>
                    <span class='btn-label'>
                      <i class='fa fa-plus'></i>{' '}
                    </span>
                    <span class='btn-text'>Tạo phòng Zoom</span>
                  </button>
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

                            <th>Tên phòng </th>
                            <th>Phòng thi</th>
                            <th>ZoomId </th>
                            <th>Passcode</th>
                            <th>Link</th>
                            <th>Mã môn học</th>
                            <th>Mã lớp</th>
                            <th>Ngày thi</th>
                            <th>Giờ thi</th>
                            <th>Số SV</th>
                            <th>Trạng thái</th>
                            <th>Tác vụ</th>
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
                                <a href={`/room/${room.roomId}`}></a>
                                {room.name}
                              </td>
                              <td>{room.roomCode}</td>
                              <td>{room.zoomId}</td>
                              <td>{room.passcode}</td>
                              <td>
                                <a href={room.url}>Mở</a>
                              </td>
                              <td>{room.subject.subjectCode}</td>
                              <td>{room.subject.classCode}</td>
                              <td> 13/05/2022</td>
                              <td>{tConv24(room.subject?.startTime)}</td>
                              <td></td>
                              <td>
                                <span className='label label-danger'>
                                  Đã kết thúc
                                </span>
                              </td>
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

  if (user.role != 'student') return renderRooms()
  else
    return (
      <div className='container-fluid'>
        {/* Title */}
        <div className='row heading-bg'>
          <div className='col-lg-3 col-md-4 col-sm-4 col-xs-12'>
            <h5 className='txt-dark'>Phòng thi của tôi</h5>
          </div>
          {/* Breadcrumb */}
          <div className='col-lg-9 col-sm-8 col-md-8 col-xs-12'>
            <ol className='breadcrumb'>
              <li>
                <a href='index.html'>HCMUSID</a>
              </li>

              <li className='active'>
                <span>Danh sách phòng thi</span>
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
                      <table className='table  display table-hover mb-0'>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Tên phòng </th>
                            <th>Phòng thi</th>
                            <th>ZoomId </th>
                            <th>Passcode</th>
                            <th>Link</th>
                            <th>Mã môn học</th>
                            <th>Mã lớp</th>
                            <th>Ngày thi</th>
                            <th>Giờ thi</th>
                            <th>Trạng thái</th>
                          </tr>
                        </thead>

                        <tbody>
                          {roomList &&
                            roomList.map((room, index) => (
                              <tr className='text-primary font-weight-bold'>
                                <td>{index + 1}</td>
                                <td>
                                  <a href={`/room/${room.id}`}>
                                    {room.subject.name}
                                  </a>
                                </td>
                                <td>{room.roomCode}</td>
                                <td>{room.zoomId}</td>
                                <td>
                                  {room.passcode} <i className='fa fa-eye'></i>
                                </td>
                                <td>
                                  <a href={room.url}>Vào phòng</a>
                                </td>
                                <td>{room.subject.subjectCode}</td>
                                <td>{room.subject.classCode}</td>
                                <td>{room.subject.examDate}</td>
                                <td>{room.subject.startTime}</td>
                                <td>
                                  {' '}
                                  <span className='label label-danger'>
                                    {' '}
                                    Chưa định danh{' '}
                                  </span>
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

export default RoomList
