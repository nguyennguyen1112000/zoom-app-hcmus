import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { authHeader, formatDate } from '../../../helper/utils'
import { getStudents } from '../../../services/api/student'

function StudentList() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getStudents())
  }, [dispatch])
  const studentList = useSelector((state) => state.student.studentList)
  const API_URL = process.env.REACT_APP_API_URL
  const downloadTemplate = (e) => {
    e.preventDefault()
    const downloadLink = `${API_URL}/students/template`
    const a = document.createElement('a')
    a.href = downloadLink
    a.click()
  }

  const uploadFile = (e) => {
    const formData = new FormData()
    formData.append('file', e.target.value)
    axios
      .post(`${API_URL}/students/upload`, formData, authHeader())
      .then((res) => {
        e.target.value = null
        toast.success('Đã tải lên file', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className='container-fluid'>
      {/* Title */}
      <div className='row heading-bg'>
        <div className='col-lg-3 col-md-4 col-sm-4 col-xs-12'>
          <h5 className='txt-dark'>Danh sách sinh viên</h5>
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
              <span>Danh sách sinh viên</span>
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
                    <i class='fa fa-moodle'></i>
                  </span>
                  <span class='btn-text' onClick={downloadTemplate}>
                    Tải về template
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
                          <th>MSSV </th>
                          <th>Họ và tên </th>
                          <th>Email</th>
                          <th>Giới tính</th>
                          <th>Ngày sinh</th>
                          <th>Lớp học</th>
                          <th>Tác vụ</th>
                        </tr>
                      </thead>

                      <tbody>
                        {studentList &&
                          studentList.map((student, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                <a href={`/student/${student.studentId}`}>
                                  {' '}
                                  {student.studentId}
                                </a>
                              </td>
                              <td>
                                {student.firstName + ' ' + student.lastName}
                              </td>
                              <td>{student.email}</td>
                              <td>{student.gender ? 'Nam' : 'Nữ'}</td>
                              <td>{formatDate(new Date(student.birthday))}</td>
                              <td>{student.classCode}</td>

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

export default StudentList
