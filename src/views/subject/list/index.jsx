/* eslint-disable no-undef */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { authHeader, formatDate, tConv24 } from '../../../helper/utils'
import { getAllSubjects } from '../../../services/api/subject'
import 'react-toastify/dist/ReactToastify.css'
import { SpinnerCircularFixed } from 'spinners-react'

function SubjectList() {
  const dispatch = useDispatch()
  const subjects = useSelector((state) => state.subject.subjects)
  const [reload, setReload] = useState(false)
  const [loading, setLoading] = useState(false)
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
  const [select, setSelect] = useState([])
  const handleSelect = (e) => {
    const index = e.currentTarget.getAttribute('index')
    const checked = e.target.checked
    if (checked) setSelect([...select, parseInt(index)])
    else setSelect(select.filter((x) => x != parseInt(index)))
  }
  const handleSelectAll = (e) => {
    const checked = e.target.checked
    if (checked) setSelect(subjects.map((subject) => subject.id))
    else setSelect([])
  }
  const isChecked = (index) => {
    return select.includes(index)
  }
  const handleDelete = (e) => {
    e.preventDefault()

    axios
      .delete(`${API_URL}/subjects`, {
        data: select,
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      })
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
  const handleSync = (e) => {
    setLoading(true)
    axios
      .post(`${API_URL}/moodles/sync`, null, authHeader())
      .then((res) => {
        setReload(!reload)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
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
                <button class='btn btn-default '>
                  <span class='btn-text' onClick={handleSync}>
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
                            <th>
                              <th>
                                {subjects && (
                                  <input
                                    type='checkbox'
                                    name='checkbox'
                                    index='all'
                                    onChange={handleSelectAll}
                                  />
                                )}
                              </th>
                            </th>
                            <th>#</th>
                            <th>Mã môn học/ Moodle ID</th>
                            <th>Tên môn học </th>
                            <th>HK/NH</th>
                            <th>Import</th>
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
                              <td>
                                <input
                                  type='checkbox'
                                  name='checkbox'
                                  index={subject.id}
                                  onChange={handleSelect}
                                  checked={isChecked(subject.id)}
                                />
                              </td>
                              <td>{index + 1}</td>
                              <td>
                                <a href={`/subject/${subject.id}`}>
                                  {subject.subjectCode
                                    ? subject.subjectCode
                                    : subject.moodleId}
                                </a>
                              </td>
                              <td>{subject.name}</td>
                              <td>
                                {' '}
                                {subject.term &&
                                  subject.schoolYear &&
                                  `${subject.term}/${subject.schoolYear}`}
                              </td>
                              <td>
                                {subject.moodleId ? (
                                  <span className='label label-primary'>
                                    moodle
                                  </span>
                                ) : (
                                  <span className='label label-success'>
                                    file
                                  </span>
                                )}
                              </td>
                              <td>
                                {subject.examDate &&
                                  formatDate(new Date(subject.examDate))}
                              </td>
                              <td>
                                {subject.startTime
                                  ? tConv24(subject.startTime)
                                  : ''}
                              </td>
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
      <div className='spinner-loading'>
        <SpinnerCircularFixed
          size={100}
          thickness={200}
          color='#2986CC'
          enabled={loading}
        />
      </div>
      <ToastContainer />
    </div>
  )
}

export default SubjectList
