/* eslint-disable no-undef */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { authHeader } from '../../../helper/utils'
import { getAllSubjects } from '../../../services/api/subject'
import 'react-toastify/dist/ReactToastify.css'
import { SpinnerCircularFixed } from 'spinners-react'
import { Link } from 'react-router-dom'

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
  const user = useSelector((state) => state.auth.currentUser)

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
    swal({
      title: 'Are you sure?',
      text: 'This record and it`s details will be permanantly deleted!',
      icon: 'warning',
      buttons: ['Cancel', 'Yes']
    }).then(function (value) {
      if (value) {
        axios
          .delete(`${API_URL}/subjects`, {
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

  const uploadFile = (e) => {
    const formData = new FormData()
    //console.log('e.target.value', e.target.file)

    formData.append('file', e.target.files[0])
    axios
      .post(`${API_URL}/subjects/upload`, formData, authHeader())
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
        <div className='col-lg-3 col-md-4 col-sm-4 col-xs-12'></div>
        {/* Breadcrumb */}
        <div className='col-lg-9 col-sm-8 col-md-8 col-xs-12'>
          <ol className='breadcrumb'>
            <li>
              <a href='/'>HCMUSID</a>
            </li>

            <li className='active'>
              <span>Subjects</span>
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
                  <button
                    className='btn btn-danger btn-square'
                    onClick={handleDelete}
                  >
                    <span className='btn-label'>
                      <i className='fa fa-trash'></i>
                    </span>
                  </button>
                )}
                {select.length === 1 && (
                  <Link to={`/subject/update/${select[0]}`}>
                    {' '}
                    <button className='btn btn-default btn-square'>
                      <span className='btn-label'>
                        <i className='fa fa-pencil'></i>
                      </span>
                    </button>
                  </Link>
                )}
              </div>

              <div className='pull-right button-list'>
                {user.moodleId && (
                  <button className='btn btn-default btn-lable-wrap left-label'>
                    <span className='btn-label'>
                      <i className='fa fa-refresh'></i>{' '}
                    </span>
                    <span className='btn-text' onClick={handleSync}>
                      Sync Moodle
                    </span>
                  </button>
                )}
                <button
                  className='btn btn-success btn-square btn-outline'
                  onClick={downloadTemplate}
                >
                  <span className='btn-label'>
                    <i className='fa fa-download'></i>
                  </span>
                </button>
                <button className='btn btn-danger btn-square btn-outline fileupload'>
                  <span className='btn-label'>
                    <i className='fa fa-upload'></i>
                  </span>

                  <input
                    id='file_upload'
                    type='file'
                    className='upload'
                    onChange={uploadFile}
                  />
                </button>
                <Link to='/subject/0/create'>
                  <button className='btn btn-primary btn-square'>
                    <span className='btn-label'>
                      <i className='fa fa-plus'></i>
                    </span>
                  </button>
                </Link>
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
                              {subjects && (
                                <input
                                  type='checkbox'
                                  name='checkbox'
                                  index='all'
                                  onChange={handleSelectAll}
                                />
                              )}
                            </th>
                            <th>#</th>
                            <th>ID/ Moodle ID</th>
                            <th>Name </th>
                            <th>Term/School year</th>
                            <th>Import type</th>

                            <th>Student year</th>
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
                              {/* <td>
                                {subject.examDate &&
                                  formatDate(new Date(subject.examDate))}
                              </td>
                              <td>
                                {subject.startTime
                                  ? tConv24(subject.startTime)
                                  : ''}
                              </td>
                              <td>{subject.examTime}</td> */}
                              <td>{subject.studentYear}</td>
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
