/* eslint-disable no-undef */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { SpinnerCircularFixed } from 'spinners-react'
import { authHeader, formatDate, tConv24 } from '../../../helper/utils'
import { getCurrentSubject } from '../../../services/api/subject'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const API_URL = process.env.REACT_APP_API_URL
function SubjectDetail() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [reload, setReload] = useState(false)
  let { id } = useParams()
  const user = useSelector((state) => state.auth.currentUser)
  const currentSubject = useSelector((state) => state.subject.currentSubject)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchStudent, setSearchStudent] = useState(null)
  console.log('search', searchStudent)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm)
        axios
          .get(`${API_URL}/students/${searchTerm}`, authHeader())
          .then((res) => {
            console.log(res.data)

            setSearchStudent(res.data)
          })
          .catch((err) => {
            setSearchStudent(null)
            console.log(err)
          })
    }, 3000)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])
  useEffect(() => {
    setTimeout(() => {
      $('#datable_1').DataTable().destroy()
      if (id) {
        dispatch(getCurrentSubject(id))
      }
    }, 2000)
  }, [id, reload])
  useEffect(() => {
    $('#datable_1').DataTable()
  }, [currentSubject, reload])
  const downloadTemplate = (e) => {
    e.preventDefault()
    const downloadLink = `${API_URL}/subjects/template/add_students`
    const a = document.createElement('a')
    a.href = downloadLink
    a.click()
  }

  const uploadFile = (e) => {
    const formData = new FormData()
    //console.log('e.target.value', e.target.file)

    formData.append('file', e.target.files[0])
    axios
      .post(`${API_URL}/subjects/upload/${currentSubject?.id}/students`, formData, authHeader())
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
  const handleAddStudent = () => {
    axios
      .post(
        `${API_URL}/subjects/${currentSubject?.id}/students`,
        [searchTerm],
        authHeader()
      )
      .then((res) => {
        setSearchStudent(null)
        setSearchTerm('')
        toast.success('Đã thêm sinh viên', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
        document.getElementById('close-modal').click()
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

  const handleSyncStudents = (e) => {
    setLoading(true)
    axios
      .post(
        `${API_URL}/moodles/sync/subject/${currentSubject?.id}/students`,
        null,
        authHeader()
      )
      .then((res) => {
        setReload(!reload)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
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
    if (checked)
      setSelect(currentSubject?.students?.map((student) => student.id))
    else setSelect([])
  }
  const isChecked = (index) => {
    return select.includes(index)
  }
  const handleDelete = (e) => {
    e.preventDefault()

    axios
      .delete(`${API_URL}/subjects/${currentSubject.id}/students`, {
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
  return (
    <div className='container-fluid'>
      {/* Title */}
      <div className='row heading-bg'>
        {/* Breadcrumb */}
        <div className='col-lg-12 col-sm-8 col-md-8 col-xs-12'>
          <ol className='breadcrumb'>
            <li>
              <a href='/room'>Quản lý</a>
            </li>
            <li>
              <a href='/subject'>
                <span>Môn học</span>
              </a>
            </li>
            <li className='active'>
              <span>{currentSubject?.name}</span>
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
                <h6 className='panel-title txt-dark'>Thông tin môn học</h6>
              </div>
              <div className='pull-right'>
                <a
                  href={`/subject/update/${currentSubject?.id}`}
                  className='btn btn-default btn-icon-anim btn-square edit-button'
                >
                  <i className='fa fa-pencil' />
                </a>
              </div>
              <div className='clearfix' />
            </div>
            <div className='panel-wrapper collapse in'>
              <div className='panel-body'>
                <div className='table-responsive mt-40'>
                  <table className='table table-bordered '>
                    <tbody>
                      <tr>
                        <td className='table-title-cell '>ID môn học Moodle</td>
                        <td colSpan={7}>{currentSubject?.moodleId}</td>
                      </tr>
                      <tr>
                        <td className='table-title-cell '>Mã môn học</td>
                        <td colSpan={7}>{currentSubject?.subjectCode}</td>
                      </tr>
                      <tr>
                        <td className='table-title-cell '>Tên môn học</td>
                        <td colSpan={7}>{currentSubject?.name}</td>
                      </tr>
                      <tr>
                        <td className='table-title-cell'>Học kì</td>
                        <td colSpan={7}> {currentSubject?.term}</td>
                      </tr>
                      <tr>
                        <td className='table-title-cell'>Năm học</td>
                        <td colSpan={7}> {currentSubject?.schoolYear}</td>
                      </tr>
                      <tr>
                        <td className='table-title-cell'>Giảng viên</td>
                        <td colSpan={7}> {currentSubject?.teacher}</td>
                      </tr>
                      <tr>
                        <td className='table-title-cell'>Khóa</td>
                        <td colSpan={7}> {currentSubject?.studentYear}</td>
                      </tr>
                      <tr>
                        <td className='table-title-cell'>Mã lớp</td>
                        <td colSpan={7}> {currentSubject?.classCode}</td>
                      </tr>
                      <tr>
                        <td className='table-title-cell'>Mã bậc</td>
                        <td colSpan={7}> {currentSubject?.educationLevel}</td>
                      </tr>
                      <tr>
                        <td className='table-title-cell'>Mã kì thi</td>
                        <td colSpan={7}> {currentSubject?.examCode}</td>
                      </tr>
                      <tr>
                        <td className='table-title-cell'>Giờ thi</td>
                        <td colSpan={7}>
                          {currentSubject?.startTime
                            ? tConv24(currentSubject?.startTime)
                            : ''}
                        </td>
                      </tr>
                      <tr>
                        <td className='table-title-cell'>Ngày thi</td>
                        <td colSpan={7}>
                          {currentSubject?.examDate
                            ? formatDate(new Date(currentSubject.examDate))
                            : ''}
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

      <div className='row'>
        <div className='col-lg-12'>
          <div className='panel panel-default card-view'>
            <div className='panel-heading'>
              <div className='pull-left'>
                <h6 className='panel-title txt-dark'>Danh sách sinh viên</h6>
              </div>
              <div></div>
              <div className='pull-right button-list'>
                {select.length > 0 && (
                  <button class='btn btn-danger ' onClick={handleDelete}>
                    <span class='btn-label'>
                      <i class='fa fa-trash'></i>
                    </span>
                  </button>
                )}
                {currentSubject?.moodleId && (
                  <button class='btn btn-default'>
                    <span class='btn-text' onClick={handleSyncStudents}>
                      Đồng bộ Moodle
                    </span>
                  </button>
                )}
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
                    Tải lên file sinh viên
                  </span>
                  <input
                    id='file_upload'
                    type='file'
                    className='upload'
                    onChange={uploadFile}
                  />
                </button>
                <button
                  type='button'
                  className='btn btn-primary'
                  data-toggle='modal'
                  data-target='#myModal'
                >
                  Thêm SV
                </button>
                <div className='modal' id='myModal'>
                  <div className='modal-dialog'>
                    <div className='modal-content'>
                      <div className='modal-header'>
                        <button
                          type='button'
                          className='close'
                          data-dismiss='modal'
                          aria-hidden='true'
                          id='close-modal'
                        >
                          ×
                        </button>
                        <h5 className='modal-title'>
                          Thêm sinh viên vào lớp học
                        </h5>
                      </div>
                      <div className='modal-body'>
                        <form>
                          <div className='form-group'>
                            <label
                              htmlFor='recipient-name'
                              className='control-label mb-10'
                            >
                              MSSV
                            </label>
                            <input
                              type='text'
                              className='form-control'
                              id='recipient-name'
                              name='studentId'
                              placeholder='Nhập MSSV'
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {!searchStudent && (
                              <div className='help-block with-errors'>
                                Không tìm thấy sinh viên
                              </div>
                            )}
                          </div>
                          {searchStudent && (
                            <div className='form-group'>
                              <label
                                htmlFor='message-text'
                                className='control-label mb-10'
                              >
                                {searchStudent.firstName +
                                  ' ' +
                                  searchStudent.lastName}
                              </label>
                            </div>
                          )}
                        </form>
                      </div>
                      <div className='modal-footer'>
                        <button
                          type='button'
                          className='btn btn-default'
                          data-dismiss='modal'
                        >
                          Thoát
                        </button>
                        <button
                          type='button'
                          className='btn btn-danger'
                          onClick={handleAddStudent}
                        >
                          Thêm sinh viên
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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
                            {currentSubject?.students && (
                              <input
                                type='checkbox'
                                name='checkbox'
                                index='all'
                                onChange={handleSelectAll}
                              />
                            )}
                          </th>
                          <th>#</th>
                          <th>Họ và tên</th>
                          <th>MSSV</th>
                          <th>Email</th>
                          <th>Import</th>
                        </tr>
                      </thead>

                      <tbody>
                        {currentSubject?.students?.map((student, index) => (
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
                              {student.firstName + ' ' + student.lastName}
                            </td>
                            <td>{student.studentId}</td>
                            <td>{student.email}</td>
                            <td>
                              {student.moodleId ? (
                                <span className='label label-primary'>
                                  moodle
                                </span>
                              ) : (
                                <span className='label label-success'>
                                  file
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
      <ToastContainer />
      <div className='spinner-loading'>
        <SpinnerCircularFixed
          size={100}
          thickness={200}
          color='#2986CC'
          enabled={loading}
        />
      </div>
    </div>
  )
}

export default SubjectDetail
