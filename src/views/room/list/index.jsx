import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRooms } from '../../../services/api/room'
function RoomList() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.currentUser)
  useEffect(() => {
    dispatch(getRooms())
  }, [dispatch])
  
  const roomList = useSelector((state) => state.room.roomList)
  const renderStudentRoom = () => {
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
                    <span class='btn-text'>Thêm thông tin phòng thi</span>
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
                      <table className='table  display table-hover'>
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
                          {/* {roomList &&
                            roomList.map((room, index) => (
                              <tr>
                                <td>{index + 1}</td>
                                <td>{room.name}</td>
                                <td>{room.roomCode}</td>
                                <td>{room.zoomId}</td>
                                <td>{room.passcode}</td>
                                <td>
                                  <a href={room.url}>Mở</a>
                                </td>
                                <td>{room.subject.subjectCode}</td>
                                <td>{room.subject.classCode}</td>
                                <td> 13/05/2022</td>
                                <td>07:45 AM</td>
                                <td>20</td>
                                <td>
                                  <span className='label label-danger'>
                                    Đã kết thúc
                                  </span>
                                </td>
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
                            ))} */}
                          <tr>
                            <td>1</td>
                            <td>Thi cuối kì Di truyền</td>
                            <td>BIO10011</td>
                            <td>7447311234</td>
                            <td>035172</td>
                            <td>
                              <a href='/'>Mở</a>
                            </td>
                            <td>BIO10011</td>
                            <td>20SHH1</td>
                            <td>13/05/2022</td>
                            <td>07:45 AM</td>
                            <td>20</td>
                            <td>
                              <span className='label label-success'>
                                Đang điểm danh
                              </span>
                            </td>
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
                          <tr>
                            <td>1</td>
                            <td>Thi cuối kì Di truyền</td>
                            <td>BIO10011</td>
                            <td>7447311234</td>
                            <td>035172</td>
                            <td>
                              <a href='/'>Mở</a>
                            </td>
                            <td>BIO10011</td>
                            <td>20SHH1</td>
                            <td>13/05/2022</td>
                            <td>07:45 AM</td>
                            <td>20</td>
                            <td>
                              <span className='label label-primary'>
                                Đang thi
                              </span>
                            </td>
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
                          <tr>
                            <td>1</td>
                            <td>Thi cuối kì Di truyền</td>
                            <td>BIO10011</td>
                            <td>7447311234</td>
                            <td>035172</td>
                            <td>
                              <a href='/'>Mở</a>
                            </td>
                            <td>BIO10011</td>
                            <td>20SHH1</td>
                            <td>13/05/2022</td>
                            <td>07:45 AM</td>
                            <td>20</td>
                            <td>
                              <span className='label label-success'>
                                Đang điểm danh
                              </span>
                            </td>
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
                          <tr>
                            <td>1</td>
                            <td>Thi cuối kì Di truyền</td>
                            <td>BIO10011</td>
                            <td>7447311234</td>
                            <td>035172</td>
                            <td>
                              <a href='/'>Mở</a>
                            </td>
                            <td>BIO10011</td>
                            <td>20SHH1</td>
                            <td>13/05/2022</td>
                            <td>07:45 AM</td>
                            <td>20</td>
                            <td>
                              <span className='label label-default'>
                                Chưa bắt đầu
                              </span>
                            </td>
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
                          <tr>
                            <td>1</td>
                            <td>Thi cuối kì Di truyền</td>
                            <td>BIO10011</td>
                            <td>7447311234</td>
                            <td>035172</td>
                            <td>
                              <a href='/'>Mở</a>
                            </td>
                            <td>BIO10011</td>
                            <td>20SHH1</td>
                            <td>13/05/2022</td>
                            <td>07:45 AM</td>
                            <td>20</td>
                            <td>
                              <span className='label label-danger'>
                                Đã kết thúc
                              </span>
                            </td>
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
  
  if (user.role != 'student') return renderStudentRoom()
  else return (
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
                        <tr className='text-primary font-weight-bold'>
                          <td>1</td>
                          <td>Thi Phương Pháp tính cuối kì</td>
                          <td>P01</td>
                          <td>7447311234</td>
                          <td>
                            123456 <i className='fa fa-eye'></i>
                          </td>
                          <td>
                            <a href='/'>Vào phòng</a>
                          </td>
                          <td>BAA00101</td>
                          <td>21CLC01</td>
                          <td>Hôm nay</td>
                          <td>07:45 AM</td>
                          <td>
                            {' '}
                            <span className='label label-danger'>
                              {' '}
                              Chưa định danh{' '}
                            </span>
                          </td>
                        </tr>
                        <tr >
                          <td>2</td>
                          <td>Thi Hệ điều hành cuối kì</td>
                          <td>P03</td>
                          <td>7447311234</td>
                          <td>
                            6hg0d <i className='fa fa-eye'></i>
                          </td>
                          <td>
                            <a href='/'>Vào phòng</a>
                          </td>
                          <td>BAA00101</td>
                          <td>21CLC01</td>
                          <td>13/05/2022</td>
                          <td>09:45 AM</td>
                          <td>
                            {' '}
                            <span className='label label-warning'>
                              Chưa bắt đầu
                            </span>
                          </td>
                        </tr>
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
