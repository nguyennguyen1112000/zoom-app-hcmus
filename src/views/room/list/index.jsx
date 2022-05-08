import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRooms } from '../../../services/api/room'
function RoomList() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRooms())
  }, [dispatch])
  const roomList = useSelector((state) => state.room.roomList)
  return (
    <div className='container-fluid'>
      {/* Title */}
      <div className='row heading-bg'>
        <div className='col-lg-3 col-md-4 col-sm-4 col-xs-12'>
          <h5 className='txt-dark'>Danh sách phòng Zoom</h5>
        </div>
        {/* Breadcrumb */}
        <div className='col-lg-9 col-sm-8 col-md-8 col-xs-12'>
          <ol className='breadcrumb'>
            <li>
              <a href='index.html'>Dashboard</a>
            </li>
            <li>
              <a href='#'>
                <span>apps</span>
              </a>
            </li>
            <li className='active'>
              <span>DSSV</span>
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
              <div className='pull-right button-list'>
                <button class='btn btn-success btn-lable-wrap left-label'>
                  <span class='btn-label'>
                    <i class='fa fa-download'></i>
                  </span>
                  <span class='btn-text'>Tải về template</span>
                </button>
                <button class='btn btn-danger btn-lable-wrap left-label'>
                  <span class='btn-label'>
                    <i class='fa fa-upload'></i>
                  </span>
                  <span class='btn-text'>Tải lên file</span>
                </button>
                <button class='btn btn-primary btn-lable-wrap left-label'>
                  <span class='btn-label'>
                    <i class='fa fa-plus'></i>{' '}
                  </span>
                  <span class='btn-text'>Thêm phòng thi</span>
                </button>
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
                        {roomList &&
                          roomList.map((room, index) => (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{room.name}</td>
                              <td>Edinburgh</td>
                              <td>{room.zoomId}</td>
                              <td>{room.passcode}</td>
                              <td>
                                <a href={room.url}>Mở</a>
                              </td>
                              <td>{room.subject.subjectCode}</td>
                              <td>{room.subject.classCode}</td>
                              <td>$320,800</td>
                              <td>2011/04/25</td>
                              <td>$320,800</td>
                              <td>$320,800</td>
                              <td>
                                <a
                                  href='javascript:void(0)'
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

export default RoomList
