/* eslint-disable no-undef */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { authHeader, formatDate } from '../../../helper/utils'
import { getStudents } from '../../../services/api/student'

function StudentList() {
  const dispatch = useDispatch()
  const studentList = useSelector((state) => state.student.studentList)
  const [select, setSelect] = useState([])
  const [reload, setReload] = useState(false)
  const [studentLink, setStudentLink] = useState('/')
  useEffect(() => {
    setTimeout(() => {
      $('#datable_1').DataTable().destroy()
      dispatch(getStudents())
    }, 2000)
  }, [reload])
  useEffect(() => {
    $('#datable_1').DataTable()
  }, [studentList, reload])

  const API_URL = process.env.REACT_APP_API_URL

  /********************** Handle delete students *********************/
  const handleSelect = (e) => {
    const index = e.currentTarget.getAttribute('index')
    const checked = e.target.checked
    if (checked) setSelect([...select, parseInt(index)])
    else setSelect(select.filter((x) => x != parseInt(index)))
    if (select.length === 0) {
      const student = studentList.find((s) => s.id === parseInt(index))
      setStudentLink(`/student/${student?.studentId}`)
    }
  }
  const handleSelectAll = (e) => {
    const checked = e.target.checked
    if (checked) setSelect(studentList.map((student) => student.id))
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
          .delete(`${API_URL}/students`, {
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
            setSelect([])
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
  /********************** Handle download/upload file *********************/
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
        toast.success('Upload file successfully', {
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

  return (
    <div className='container-fluid'>
      {/* Title */}
      <div className='row heading-bg'>
        <div className='col-lg-3 col-md-4 col-sm-4 col-xs-12'></div>
        {/* Breadcrumb */}
        <div className='col-lg-9 col-sm-8 col-md-8 col-xs-12'>
          <ol className='breadcrumb'>
            <li>
              <a href='/'>HCMUSID</a>
            </li>

            <li className='active'>
              <span>Students</span>
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
              <div className='pull-left button-list'>
                {select.length > 0 && (
                  <div className='pull-left button-list'>
                    <button
                      class='btn btn-danger btn-square'
                      onClick={handleDelete}
                    >
                      <span class='btn-label' style={{ color: 'white' }}>
                        <i class='fa fa-trash'></i>
                      </span>
                    </button>
                  </div>
                )}
                {select.length === 1 && (
                  <div className='pull-left button-list'>
                    <Link to={studentLink}>
                      <button class='btn btn-default btn-square'>
                        <span class='btn-label'>
                          <i class='fa fa-pencil'></i>
                        </span>
                      </button>
                    </Link>
                  </div>
                )}
              </div>
              <div className='pull-right button-list'>
                <button
                  class='btn btn-success btn-square btn-outline'
                  onClick={downloadTemplate}
                >
                  <span class='btn-label'>
                    <i class='fa fa-download'></i>
                  </span>
                </button>
                <button class='btn btn-danger btn-square fileupload btn-outline'>
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
                <Link to={`/student/0/create`}>
                  <button class='btn btn-primary btn-square'>
                    <span class='btn-label'>
                      <i class='fa fa-plus'></i>{' '}
                    </span>
                  </button>
                </Link>
              </div>
              <div className='clearfix' />
            </div>
            <div className='panel-wrapper collapse in'>
              <div className='panel-body'>
                <div className='table-wrap'>
                  <div className='table-responsive'>
                    <table
                      id='datable_1'
                      className='table table-hover display  pb-30'
                    >
                      <thead>
                        <tr>
                          <th>
                            {studentList && (
                              <input
                                type='checkbox'
                                name='checkbox'
                                index='all'
                                onChange={handleSelectAll}
                              />
                            )}
                          </th>
                          <th>#</th>
                          <th>ID</th>
                          <th>Full name</th>
                          <th>Email</th>
                          <th>Gender</th>
                          <th>Birthday</th>
                          <th>Class</th>
                          <th>Face data</th>
                          <th>Import</th>
                        </tr>
                      </thead>

                      <tbody>
                        {studentList?.map((student, index) => (
                          <tr key={index}>
                            <td>
                              <input
                                type='checkbox'
                                name='checkbox'
                                index={student.id}
                                onChange={handleSelect}
                                checked={isChecked(student.id)}
                              />
                            </td>
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
                            <td>
                              {student.gender === true && 'Male'}
                              {student.gender === false && 'Female'}
                              {student.gender === null && '--'}
                            </td>
                            <td>
                              {student.birthday
                                ? formatDate(new Date(student.birthday))
                                : '--'}
                            </td>
                            <td>{student.classCode}</td>
                            <td>
                              {student.images &&
                              student.images.length > 0 &&
                              student.images.some(
                                (img) => img.type === 'face_data'
                              ) ? (
                                <span className='label label-success'>
                                  Uploaded
                                </span>
                              ) : (
                                <span className='label label-danger'>
                                  Not added yet
                                </span>
                              )}
                            </td>
                            <td>
                              {student.moodleId ? (
                                <span className='label label-primary'>
                                  Moodle
                                </span>
                              ) : (
                                <span className='label label-default'>
                                  File
                                </span>
                              )}
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
