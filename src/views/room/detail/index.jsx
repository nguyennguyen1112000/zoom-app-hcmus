import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { formatDate, formatTime } from '../../../helper/utils'
import { getRoom } from '../../../services/api/room'

function RoomDetail() {
  const dispatch = useDispatch()
  const [mode, setMode] = useState({ checkInConfig: false })
  let { id } = useParams()
  const user = useSelector((state) => state.auth.currentUser)
  useEffect(() => {
    if (id) dispatch(getRoom(id))
  }, [dispatch, id])
  const currentRoom = useSelector((state) => state.room.currentRoom)
  console.log('student', currentRoom)
  const handleChangeMode = (e) => {
    const buttonType = e.currentTarget.getAttribute('data-button')
    switch (buttonType) {
      case 'checkInConfig':
        setMode({ ...mode, checkInConfig: !mode.checkInConfig })
        break
      default:
        break
    }
  }
  const renderStudentRoom = () => {
    return (
      <div className='container-fluid'>
        {/* Title */}
        <div className='row heading-bg'>
          {/* Breadcrumb */}
          <div className='col-lg-12 col-sm-8 col-md-8 col-xs-12'>
            <ol className='breadcrumb'>
              <li>
                <a href='index.html'>{user && user.studentId}</a>
              </li>
              <li>
                <a href='/room'>
                  <span>Phòng thi</span>
                </a>
              </li>
              <li className='active'>
                <span>{currentRoom && currentRoom.name}</span>
              </li>
            </ol>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-12'>
            <div className='panel panel-default card-view'>
              <div className='panel-heading'>
                <div className='pull-left'>
                  <h6 className='panel-title txt-dark'>Thông tin phòng Zoom</h6>
                </div>
                <div className='clearfix' />
              </div>
              <div className='panel-wrapper collapse in'>
                <div className='panel-body'>
                  <div className='table-responsive mt-40'>
                    <table className='table table-bordered '>
                      {currentRoom && (
                        <tbody>
                          <tr>
                            <td className='table-title-cell '>Tên phòng</td>
                            <td colSpan={7}>{currentRoom.name}</td>
                          </tr>
                          <tr>
                            <td className='table-title-cell '>Zoom ID</td>
                            <td colSpan={7}>{currentRoom.zoomId}</td>
                          </tr>
                          <tr>
                            <td className='table-title-cell'>Passcode</td>
                            <td colSpan={7}> {currentRoom.passcode}</td>
                          </tr>
                          <tr>
                            <td className='table-title-cell'>Link Zoom</td>
                            <td colSpan={7}>
                              <a
                                style={{ display: 'table-cell' }}
                                target='_blank'
                                rel='noopener noreferrer'
                                href={currentRoom.url}
                              >
                                {currentRoom.url}
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td className='table-title-cell'>Phòng thi</td>
                            <td colSpan={7}>{currentRoom.roomCode}</td>
                          </tr>

                          <tr>
                            <th className='table-title-cell'>Ghi chú</th>
                            <td colSpan={7}></td>
                          </tr>
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-lg-12'>
            <div className='panel panel-default card-view'>
              <div className='panel-heading'>
                <div className='pull-left'>
                  <h6 className='panel-title txt-dark'>Điểm danh</h6>
                </div>
              </div>
              <div className='panel-wrapper collapse in'>
                <div className='panel-body'>
                  <form className='form-horizontal' role='form'>
                    <div className='form-body'>
                      <div className='row'>
                        <div className='col-md-8'>
                          <div className='form-group'>
                            <label className='control-label col-md-4 bold-title'>
                              Thời gian bắt đầu:
                            </label>
                            <div className='col-md-8'>
                              <p className='form-control-static'>
                                {currentRoom &&
                                  currentRoom.checkInStartTime &&
                                  formatTime(
                                    new Date(currentRoom.checkInStartTime)
                                  )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-8'>
                          <div className='form-group'>
                            <label className='control-label col-md-4 bold-title'>
                              Thời gian kết thúc:
                            </label>
                            <div className='col-md-4'>
                              <p className='form-control-static'>
                                {currentRoom &&
                                  currentRoom.checkInEndTime &&
                                  formatTime(
                                    new Date(currentRoom.checkInEndTime)
                                  )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class='form-actions mt-10'>
                        <div class='row'>
                          <div class='col-md-6'>
                            <div class='row'>
                              <div class='col-md-offset-3 col-md-9'>
                                <a class='btn btn-success  mr-10' href={`/room/${currentRoom?.id}/verify/s1`}>Điểm danh</a>
                              </div>
                            </div>
                          </div>
                          <div class='col-md-6'> </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-lg-12'>
            <div className='panel panel-default card-view'>
              <div className='panel-heading'>
                <div className='pull-left'>
                  <h6 className='panel-title txt-dark'>Kết quả điểm danh</h6>
                </div>
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
                    <span class='btn-text'>Tải lên file sinh viên</span>
                  </button>
                  <button class='btn btn-primary btn-lable-wrap left-label'>
                    <span class='btn-label'>
                      <i class='fa fa-plus'></i>{' '}
                    </span>
                    <span class='btn-text'>Thêm sinh viên</span>
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
                            <th>Họ và tên</th>
                            <th>MSSV</th>
                            <th>Ngày sinh</th>
                            <th>Giới tính</th>
                            <th>Dữ liệu khuôn mặt</th>
                            <th>Thẻ định danh</th>
                            <th>Tác vụ</th>
                          </tr>
                        </thead>

                        <tbody>
                          {currentRoom &&
                            currentRoom.students &&
                            currentRoom.students.map((student, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  {student.firstName + ' ' + student.lastName}
                                </td>
                                <td>{student.studentId}</td>
                                <td>
                                  {formatDate(new Date(student.birthday))}
                                </td>
                                <td>{student.gender ? 'Nam' : 'Nữ'}</td>
                                <td>
                                  {student.images &&
                                  student.images.length > 0 &&
                                  student.images.some(
                                    (img) => img.type === 'face_data'
                                  ) ? (
                                    <span className='label label-success'>
                                      Đã upload
                                    </span>
                                  ) : (
                                    <span className='label label-danger'>
                                      Chưa có
                                    </span>
                                  )}
                                </td>
                                <td>
                                  {student.images &&
                                  student.images.length > 0 &&
                                  student.images.some(
                                    (img) => img.type === 'id_card'
                                  ) ? (
                                    <span className='label label-success'>
                                      Đã upload
                                    </span>
                                  ) : (
                                    <span className='label label-danger'>
                                      Chưa có
                                    </span>
                                  )}
                                </td>
                                <td>
                                  <a
                                    href='javascript:void(0)'
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
        {/*/Row*/}
      </div>
    )
  }
  const renderAdminRoom = () => {
    return (
      <div className='container-fluid'>
        {/* Title */}
        <div className='row heading-bg'>
          {/* Breadcrumb */}
          <div className='col-lg-12 col-sm-8 col-md-8 col-xs-12'>
            <ol className='breadcrumb'>
              <li>
                <a href='index.html'>Quản lý</a>
              </li>
              <li>
                <a href='/room'>
                  <span>Phòng Zoom</span>
                </a>
              </li>
              <li className='active'>
                <span>{currentRoom && currentRoom.name}</span>
              </li>
            </ol>
          </div>
          {/* /Breadcrumb */}
        </div>
        {/* /Title */}
        {/*Row*/}
        <div className='row'>
          <div className='col-md-12'>
            <div className='panel panel-default card-view'>
              <div className='panel-heading'>
                <div className='pull-left'>
                  <h6 className='panel-title txt-dark'>Thông tin phòng Zoom</h6>
                </div>
                <div className='pull-right'>
                  <button className='btn btn-default btn-icon-anim btn-square edit-button'>
                    <i className='fa fa-pencil' />
                  </button>
                </div>
                <div className='clearfix' />
              </div>
              <div className='panel-wrapper collapse in'>
                <div className='panel-body'>
                  <div className='table-responsive mt-40'>
                    <table className='table table-bordered '>
                      {currentRoom && (
                        <tbody>
                          <tr>
                            <td className='table-title-cell '>Tên phòng</td>
                            <td colSpan={7}>{currentRoom.name}</td>
                          </tr>
                          <tr>
                            <td className='table-title-cell '>Zoom ID</td>
                            <td colSpan={7}>{currentRoom.zoomId}</td>
                          </tr>
                          <tr>
                            <td className='table-title-cell'>Passcode</td>
                            <td colSpan={7}> {currentRoom.passcode}</td>
                          </tr>
                          <tr>
                            <td className='table-title-cell'>Link Zoom</td>
                            <td colSpan={7}>
                              <a
                                style={{ display: 'table-cell' }}
                                target='_blank'
                                rel='noopener noreferrer'
                                href={currentRoom.url}
                              >
                                {currentRoom.url}
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td className='table-title-cell'>Phòng thi</td>
                            <td colSpan={7}>{currentRoom.roomCode}</td>
                          </tr>

                          <tr>
                            <th className='table-title-cell'>Ghi chú</th>
                            <td colSpan={7}></td>
                          </tr>
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*/Row*/}
        {/*Row*/}
        <div className='row'>
          <div className='col-md-12'>
            <div className='panel panel-default card-view'>
              <div className='panel-heading'>
                <div className='pull-left'>
                  <h6 className='panel-title txt-dark'>Thông tin môn học</h6>
                </div>
                <div className='pull-right'>
                  <button className='btn btn-default btn-icon-anim btn-square edit-button'>
                    <i className='fa fa-pencil' />
                  </button>
                </div>
                <div className='clearfix' />
              </div>
              <div className='panel-wrapper collapse in'>
                <div className='panel-body'>
                  <div className='table-responsive mt-40'>
                    <table className='table table-bordered '>
                      {currentRoom && currentRoom.subject && (
                        <tbody>
                          <tr>
                            <td className='table-title-cell '>Mã môn học</td>
                            <td>{currentRoom.subject.subjectCode}</td>
                            <td className='table-title-cell '>Họ tên CBGD</td>
                            <th>{currentRoom.subject.teacher}</th>
                            <th className='table-title-cell '>Giờ thi</th>
                            <th>{currentRoom.subject.startTime}</th>
                          </tr>
                          <tr>
                            <td className='table-title-cell '>Tên môn học</td>
                            <td>{currentRoom.subject.name}</td>
                            <td className='table-title-cell '>Mã lớp</td>
                            <td>{currentRoom.subject.classCode}</td>
                            <td className='table-title-cell '>Thời gian thi</td>
                            <td>{currentRoom.subject.examTime} phút</td>
                          </tr>
                          <tr>
                            <td className='table-title-cell'>Học kì</td>
                            <td>{currentRoom.subject.tearm}</td>
                            <td className='table-title-cell'>Loại lớp</td>
                            <td>{currentRoom.subject.educationLevel}</td>
                            <td className='table-title-cell'>Mã kì thi</td>
                            <td>{currentRoom.subject.examCode}</td>
                          </tr>
                          <tr>
                            <td className='table-title-cell'>Năm học</td>
                            <td>{currentRoom.subject.schoolYear}</td>
                            <td className='table-title-cell'>Khóa</td>
                            <td>{currentRoom.subject.studentYear}</td>
                            <td className='table-title-cell'>Số SV</td>
                            <td>{currentRoom.students.length}</td>
                          </tr>
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*/Row*/}
        {/*Row*/}
        <div className='row'>
          <div className='col-lg-12'>
            <div className='panel panel-default card-view'>
              <div className='panel-heading'>
                <div className='pull-left'>
                  <h6 className='panel-title txt-dark'>Cài đặt điểm danh</h6>
                </div>
                <div className='pull-right'>
                  <button
                    className='btn btn-default btn-icon-anim btn-square edit-button'
                    data-button='checkInConfig'
                    onClick={handleChangeMode}
                  >
                    <i className='fa fa-pencil' />
                  </button>
                </div>
                <div className='clearfix' />
              </div>
              <div className='panel-wrapper collapse in'>
                <div className='panel-body'>
                  <form className='form-horizontal' role='form'>
                    <div className='form-body'>
                      {/* <div className='row'>
                      <div className='col-md-8'>
                        <div className='form-group'>
                          <label className='control-label col-md-4 bold-title'>
                            Loại điểm danh:
                          </label>
                          <div className='col-md-8'>
                            <p className='form-control-static'> Tự động</p>
                          </div>
                        </div>
                      </div>
            
                    </div> */}
                      {/* <div className='row'>
                      <div className='col-md-8'>
                        <div className='form-group'>
                          <label className='control-label col-md-4 bold-title'>
                            Thời gian bắt đầu:
                          </label>
                          <div className='col-md-8'>
                            <p className='form-control-static'> 06:45 </p>
                          </div>
                        </div>
                      </div>
                    </div> */}
                      {/* /Row */}
                      {/* <div className='row'>
                      <div className='col-md-8'>
                        <div className='form-group'>
                          <label className='control-label col-md-4 bold-title'>
                            Thời gian kết thúc:
                          </label>
                          <div className='col-md-4'>
                            <p className='form-control-static'> 07:00 </p>
                          </div>
                        </div>
                      </div>
                    </div> */}
                      {/* /Row */}
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className='form-group'>
                            <label className='control-label col-md-3'>
                              Loại điểm danh
                            </label>
                            <div className='col-md-9'>
                              <select
                                className='form-control'
                                data-placeholder='Choose a Category'
                                tabIndex={1}
                              >
                                <option value='Category 1'>Tự động</option>
                                <option value='Category 2'>Tự cài đặt</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className='form-group'>
                            <label className='control-label col-md-3'>
                              Thời gian bắt đầu
                            </label>
                            <div className='col-md-9'>
                              <div
                                className='input-group date'
                                id='datetimepicker2'
                              >
                                07:40 AM
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className='form-group'>
                            <label className='control-label col-md-3'>
                              Dừng
                            </label>
                            <div className='col-md-9'>
                              {/* <div
                              className='input-group date'
                              id='datetimepicker2'
                            >
                              <input type='text' className='form-control' />
                              <span className='input-group-addon'>
                                <span className='fa fa-clock-o' />
                              </span>
                            </div> */}
                              <button className='btn btn-square btn-danger'>
                                {' '}
                                <i className='fa fa-pause'></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class='form-actions mt-10'>
                        <div class='row'>
                          <div class='col-md-6'>
                            <div class='row'>
                              <div class='col-md-offset-3 col-md-9'>
                                <button
                                  type='submit'
                                  class='btn btn-success  mr-10'
                                >
                                  Lưu cài đặt
                                </button>
                                <button type='button' class='btn btn-default'>
                                  Thoát
                                </button>
                              </div>
                            </div>
                          </div>
                          <div class='col-md-6'> </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*/Row*/}
        <div className='row'>
          <div className='col-md-12'>
            <div className='panel panel-default card-view'>
              <div className='panel-heading'>
                <div className='pull-left'>
                  <h6 className='panel-title txt-dark'>Date time picker</h6>
                </div>
                <div className='clearfix' />
              </div>
              <div className='panel-wrapper collapse in'>
                <div className='panel-body'>
                  <div className='form-wrap'>
                    <form>
                      <div className='row'>
                        <div className='col-sm-6'>
                          <div className='form-group'>
                            <label className='control-label mb-10 text-left'>
                              date time pick
                            </label>
                            <div
                              className='input-group date'
                              id='datetimepicker1'
                            >
                              <input type='text' className='form-control' />
                              <span className='input-group-addon'>
                                <span className='fa fa-calendar' />
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className='col-sm-6'>
                          <div className='form-group'>
                            <label className='control-label mb-10 text-left'>
                              time pick
                            </label>
                            <div
                              className='input-group date'
                              id='datetimepicker2'
                            >
                              <input type='text' className='form-control' />
                              <span className='input-group-addon'>
                                <span className='fa fa-clock-o' />
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className='col-sm-6'>
                          <label className='control-label mb-10 text-left'>
                            inline date pick
                          </label>
                          <div className='form-group'>
                            <div
                              className='input-group date'
                              id='datetimepicker3'
                            />
                          </div>
                        </div>
                        <div className='col-sm-6'>
                          <label className='control-label mb-10 text-left'>
                            inline date time pick
                          </label>
                          <div className='form-group'>
                            <div
                              className='input-group date'
                              id='datetimepicker4'
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*Row*/}
        <div className='row'>
          <div className='col-lg-12'>
            <div className='panel panel-default card-view'>
              <div className='panel-heading'>
                <div className='pull-left'>
                  <h6 className='panel-title txt-dark'>Cán bộ coi thi</h6>
                </div>
                <div className='pull-right'>
                  <button class='btn btn-primary btn-lable-wrap left-label'>
                    {' '}
                    <span class='btn-label'>
                      <i class='fa fa-plus'></i>{' '}
                    </span>
                    <span class='btn-text'>Thêm cán bộ coi thi</span>
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
                            <th>Mã CBCT</th>
                            <th>Tên CBCT</th>
                            <th>Email</th>
                            <th>Giới tính</th>
                            <th>Ngày sinh</th>
                            <th>Tác vụ</th>
                          </tr>
                        </thead>

                        <tbody>
                          {currentRoom &&
                            currentRoom.examinationStaffs &&
                            currentRoom.examinationStaffs.map(
                              (staff, index) => (
                                <tr key={index}>
                                  <td>{(index = 1)}</td>
                                  <td>{staff.staffCode}</td>
                                  <td>
                                    {staff.firstName + ' ' + staff.lastName}
                                  </td>
                                  <td>{staff.email}</td>
                                  <td>{staff.gender ? 'Nam' : 'Nữ'}</td>
                                  <td>
                                    {formatDate(new Date(staff.birthday))}
                                  </td>
                                  <td>
                                    <a
                                      href='javascript:void(0)'
                                      data-toggle='tooltip'
                                    >
                                      <i className='zmdi zmdi-delete txt-danger' />
                                    </a>
                                  </td>
                                </tr>
                              )
                            )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*/Row*/}
        {/*Row*/}
        <div className='row'>
          <div className='col-lg-12'>
            <div className='panel panel-default card-view'>
              <div className='panel-heading'>
                <div className='pull-left'>
                  <h6 className='panel-title txt-dark'>Sinh viên dự thi</h6>
                </div>
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
                    <span class='btn-text'>Tải lên file sinh viên</span>
                  </button>
                  <button class='btn btn-primary btn-lable-wrap left-label'>
                    <span class='btn-label'>
                      <i class='fa fa-plus'></i>{' '}
                    </span>
                    <span class='btn-text'>Thêm sinh viên</span>
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
                            <th>Họ và tên</th>
                            <th>MSSV</th>
                            <th>Ngày sinh</th>
                            <th>Giới tính</th>
                            <th>Dữ liệu khuôn mặt</th>
                            <th>Thẻ định danh</th>
                            <th>Tác vụ</th>
                          </tr>
                        </thead>

                        <tbody>
                          {currentRoom &&
                            currentRoom.students &&
                            currentRoom.students.map((student, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  {student.firstName + ' ' + student.lastName}
                                </td>
                                <td>{student.studentId}</td>
                                <td>
                                  {formatDate(new Date(student.birthday))}
                                </td>
                                <td>{student.gender ? 'Nam' : 'Nữ'}</td>
                                <td>
                                  {student.images &&
                                  student.images.length > 0 &&
                                  student.images.some(
                                    (img) => img.type === 'face_data'
                                  ) ? (
                                    <span className='label label-success'>
                                      Đã upload
                                    </span>
                                  ) : (
                                    <span className='label label-danger'>
                                      Chưa có
                                    </span>
                                  )}
                                </td>
                                <td>
                                  {student.images &&
                                  student.images.length > 0 &&
                                  student.images.some(
                                    (img) => img.type === 'id_card'
                                  ) ? (
                                    <span className='label label-success'>
                                      Đã upload
                                    </span>
                                  ) : (
                                    <span className='label label-danger'>
                                      Chưa có
                                    </span>
                                  )}
                                </td>
                                <td>
                                  <a
                                    href='javascript:void(0)'
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
        {/*/Row*/}
      </div>
    )
  }
  if (user.role == 'student') return renderStudentRoom()
  else return renderAdminRoom()
}

export default RoomDetail
