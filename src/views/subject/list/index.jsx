/* eslint-disable no-undef */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { authHeader, formatDate, tConv24 } from '../../../helper/utils'
import { getAllSubjects } from '../../../services/api/subject'
import 'react-toastify/dist/ReactToastify.css'
function SubjectList() {
  const dispatch = useDispatch()
  const subjects = useSelector((state) => state.subject.subjects)
  const [reload, setReload] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      $('#datable_1').DataTable().destroy()
      dispatch(getAllSubjects())
    }, 2000)
  }, [reload])
  useEffect(() => {
    $('#datable_1').DataTable()
  }, [subjects, reload])

  const API_URL = process.env.REACT_APP_API_URL
  const downloadTemplate = (e) => {
    e.preventDefault()
    const downloadLink = `${API_URL}/subjects/template`
    const a = document.createElement('a')
    a.href = downloadLink
    a.click()
  }
  const handleDelete = (e) => {
    e.preventDefault()
    const index = e.currentTarget.getAttribute('index')
    axios
      .delete(`${API_URL}/subjects/${index}`, authHeader())
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
      .post(`${API_URL}/subjects/upload`, formData, authHeader())
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

  return (
    <div className='container-fluid'>
      {/* Title */}
      <div className='row heading-bg'>
        <div className='col-lg-3 col-md-4 col-sm-4 col-xs-12'>
          <h5 className='txt-dark'>Danh sách môn học</h5>
        </div>
        {/* Breadcrumb */}
        <div className='col-lg-9 col-sm-8 col-md-8 col-xs-12'>
          <ol className='breadcrumb'>
            <li>
              <a href='index.html'>HCMUSID</a>
            </li>

            <li className='active'>
              <span>Danh sách môn học</span>
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
                <button class='btn btn-default '>
                  <span class='btn-text'>
                    Đồng bộ Moodle
                  </span>
                </button>
                <button class='btn btn-success btn-lable-wrap left-label'>
                  <span class='btn-label'>
                    <i class='fa fa-download'></i>
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
                  <a href='/subject/create' className='btn-text text-white'>
                    Thêm môn học
                  </a>
                </button>
              </div>
              <div className='clearfix' />
            </div>
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
                            <th>Mã môn học</th>
                            <th>Tên môn học </th>
                            <th>HK/NH</th>
                            <th>Mã kì thi</th>
                            <th>Ngày thi</th>
                            <th>Giờ thi</th>
                            <th>Thời gian thi</th>
                            <th>Khóa</th>
                            <th>Tác vụ</th>
                          </tr>
                        </thead>

                        <tbody>
                          {subjects?.map((subject, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                <a href={`/subject/${subject.id}`}>
                                  {subject.subjectCode}
                                </a>
                              </td>
                              <td>{subject.name}</td>
                              <td>
                                {subject.term}/{subject.schoolYear}
                              </td>
                              <td>{subject.examCode}</td>
                              <td>{formatDate(new Date(subject.examDate))}</td>
                              <td>{tConv24(subject.startTime)}</td>
                              <td>{subject.examTime}</td>
                              <td>{subject.studentYear}</td>

                              <td>
                                <a
                                  href={`/subject/update/${subject.id}`}
                                  className='text-inverse pr-10'
                                  title='Edit'
                                  data-toggle='tooltip'
                                >
                                  <i className='zmdi zmdi-edit txt-warning' />
                                </a>
                                <a
                                  href='/'
                                  className='text-inverse'
                                  title='Delete'
                                  data-toggle='tooltip'
                                  index={subject.id}
                                  onClick={handleDelete}
                                >
                                  <i className='zmdi zmdi-delete txt-danger' />
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

export default SubjectList
