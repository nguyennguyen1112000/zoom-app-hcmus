import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-date-picker'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { authHeader, formatDate } from '../../../helper/utils'
import { deleteImage, uploadImage } from '../../../services/api/image'
import { getStudent } from '../../../services/api/student'
const API_URL = process.env.REACT_APP_API_URL
function StudentDetail() {
  const [currentFolder, setCurrentFolder] = useState('face_data')
  const dispatch = useDispatch()
  let { id } = useParams()
  const [editMode, setEditMode] = useState(false)
  const currentStudent = useSelector((state) => state.student.currentStudent)
  const [reload, setReload] = useState(true)
  const [input, setInput] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    gender: true,
    classCode: '',
    major: '',
    educationLevel: '',
    email: ''
  })
  const [birthday, setBirthday] = useState(new Date())

  const [errors, setErrors] = useState({
    firstName: null,
    lastName: null
  })
  function handleChange(event) {
    switch (event.target.name) {
      case 'firstName':
        if (event.target.value.length <= 50)
          setInput({
            ...input,
            firstName: event.target.value
          })
        break
      case 'lastName':
        if (event.target.value.length <= 20)
          setInput({
            ...input,
            lastName: event.target.value
          })
        break
      case 'gender':
        console.log(event.target.value)
        setInput({
          ...input,
          gender: event.target.value ==="true"
        })
        break
      case 'classCode':
        if (event.target.value.length <= 30)
          setInput({
            ...input,
            classCode: event.target.value
          })
        break
      case 'educationLevel':
        if (event.target.value.length <= 30)
          setInput({
            ...input,
            educationLevel: event.target.value
          })
        break
      case 'major':
        if (event.target.value.length <= 100)
          setInput({
            ...input,
            major: event.target.value
          })
        break

      default:
        break
    }
  }
  function validate() {
    let isValid = true
    var errs = {}

    if (!input.firstName) {
      isValid = false
      errs.firstName = 'This field is required'
    }
    if (!input.lastName) {
      isValid = false
      errs.lastName = 'This field is required'
    }
    setErrors(errs)

    return isValid
  }
  function handleSubmit(event) {
    event.preventDefault()
    if (validate()) {
      axios
        .put(
          `${API_URL}/students/${currentStudent?.id}`,
          { ...input, birthday },
          authHeader()
        )
        .then((res) => {
          setBirthday(new Date())
          setEditMode(false)
          setReload(!reload)
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })
        })
    }
  }
  useEffect(() => {
    if (id) dispatch(getStudent(id))
  }, [dispatch, id, reload])

  useEffect(() => {
    if (currentStudent) {
      setInput(currentStudent)
      if (currentStudent.birthday) setBirthday(currentStudent.birthday)
    }
  }, [currentStudent])
  const handleClickFolder = (e) => {
    e.preventDefault()
    setCurrentFolder(e.currentTarget.id)
  }

  const handleUploadFile = (e) => {
    let file = e.target.files[0]

    dispatch(uploadImage(file, currentStudent, currentFolder))
  }
  const handleDeleteImage = (e) => {
    e.preventDefault()
    const id = e.currentTarget.id
    console.log('id', id)
    dispatch(deleteImage(id))
  }

  return (
    <div className='container-fluid'>
      {/* Title */}
      <div className='row heading-bg'>
        {/* Breadcrumb */}
        <div className='col-lg-12 col-sm-8 col-md-8 col-xs-12'>
          <ol className='breadcrumb'>
            <li>
              <a href='/'>HCMUSID</a>
            </li>
            <li>
              <a href='/student'>
                <span>Students</span>
              </a>
            </li>
            <li className='active'>
              <span>18120486</span>
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
                <h6 className='panel-title txt-dark'>Student profile</h6>
              </div>
              {!editMode && (
                <div className='pull-right'>
                  <button
                    className='btn btn-default btn-icon-anim btn-square edit-button'
                    onClick={(e) => {
                      e.preventDefault()
                      setEditMode(true)
                    }}
                  >
                    <i className='fa fa-pencil' />
                  </button>
                </div>
              )}
            </div>
            <div className='panel-wrapper collapse in'>
              <div className='panel-body'>
                {!editMode && (
                  <div className='table-responsive mt-40'>
                    <table className='table table-bordered '>
                      <tbody>
                        <tr>
                          <td className='table-title-cell '>Id</td>
                          <td colSpan={7}>{currentStudent?.studentId}</td>
                        </tr>
                        <tr>
                          <td className='table-title-cell '>Email</td>
                          <td colSpan={7}>{currentStudent?.email}</td>
                        </tr>
                        <tr>
                          <td className='table-title-cell '>Full name</td>
                          <td colSpan={7}>
                            {currentStudent?.firstName +
                              ' ' +
                              currentStudent?.lastName}
                          </td>
                        </tr>
                        <tr>
                          <td className='table-title-cell'>Gender</td>
                          <td colSpan={7}>
                            {' '}
                            {currentStudent?.gender === true ? (
                              'Male'
                            ) : currentStudent?.gender === false ? (
                              'Female'
                            ) : (
                              <mark>Please update for ID verification</mark>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td className='table-title-cell'>Class</td>
                          <td colSpan={7}>{currentStudent?.classCode}</td>
                        </tr>
                        <tr>
                          <td className='table-title-cell'>Birthday</td>
                          <td colSpan={7}>
                            {currentStudent?.birthday ? (
                              formatDate(new Date(currentStudent?.birthday))
                            ) : (
                              <mark>Please update for ID verification</mark>
                            )}
                          </td>
                        </tr>

                        <tr>
                          <th className='table-title-cell'>Major</th>
                          <td colSpan={7}>{currentStudent?.major}</td>
                        </tr>
                        <tr>
                          <th className='table-title-cell'>Education level</th>
                          <td colSpan={7}>{currentStudent?.educationLevel}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
                {editMode && (
                  <div className='form-wrap'>
                    <form>
                      <div className='form-group'>
                        <label className='control-label mb-10 text-left'>
                          Email
                        </label>

                        <input
                          type='text'
                          className='form-control'
                          value={input.email}
                          disabled
                        />
                      </div>
                      <div
                        className={`form-group ${
                          errors.firstName && 'has-error'
                        }`}
                      >
                        <label className='control-label mb-10 text-left'>
                          First name (*)
                        </label>
                        <input
                          type='text'
                          className='form-control'
                          name='firstName'
                          onChange={handleChange}
                          value={input.firstName}
                          placeholder={`Enter student's first name`}
                        />
                        {errors.firstName && (
                          <div className='help-block with-errors'>
                            {errors.firstName}
                          </div>
                        )}
                      </div>
                      <div
                        className={`form-group ${
                          errors.lastName && 'has-error'
                        }`}
                      >
                        <label className='control-label mb-10 text-left'>
                          Last name (*)
                        </label>
                        <input
                          type='text'
                          className='form-control'
                          name='lastName'
                          onChange={handleChange}
                          value={input.lastName}
                          placeholder={`Enter student's last name`}
                        />
                        {errors.lastName && (
                          <div className='help-block with-errors'>
                            {errors.lastName}
                          </div>
                        )}
                      </div>
                      <div className='form-group'>
                        <label className='control-label mb-10'>Gender</label>
                        <select
                          className='form-control'
                          name='gender'
                          onChange={handleChange}
                          value={input.gender}
                        >
                          <option value={null}>----Select gender----</option>
                          <option value={true}>Male</option>
                          <option value={false}>Female</option>
                        </select>
                      </div>
                      <div className='form-group'>
                        <label className='control-label mb-10'>
                          Class code
                        </label>
                        <input
                          className='form-control'
                          type='text'
                          name='classCode'
                          onChange={handleChange}
                          value={input.classCode}
                          placeholder='Enter class code'
                        />
                      </div>
                      <div className='form-group '>
                        <label className='control-label mb-10 text-left'>
                          Birthday
                        </label>
                        <DatePicker
                          className='form-control'
                          maxDate={new Date()}
                          value={birthday}
                          onChange={setBirthday}
                        />
                      </div>
                      <div className='form-group'>
                        <label className='control-label mb-10 text-left'>
                          Major
                        </label>
                        <input
                          type='text'
                          className='form-control'
                          name='major'
                          onChange={handleChange}
                          value={input.major}
                          placeholder='Enter major'
                        />
                      </div>
                      <div className='form-group'>
                        <label className='control-label mb-10 text-left'>
                          Education level
                        </label>
                        <input
                          type='text'
                          className='form-control'
                          name='educationLevel'
                          onChange={handleChange}
                          value={input.educationLevel}
                          placeholder='Enter education level'
                        />
                      </div>
                    </form>
                    <div className='form-actions mt-10'>
                      <button
                        className='btn btn-success  mr-10'
                        onClick={handleSubmit}
                      >
                        Save
                      </button>
                      <a
                        href='/'
                        className='btn btn-default'
                        onClick={(e) => {
                          e.preventDefault()
                          setEditMode(false)
                        }}
                      >
                        Cancel
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*/Row*/}

      <div className='row'>
        <div className='col-md-12'>
          <div className='panel panel-default card-view pa-0'>
            <div className='panel-wrapper collapse in'>
              <div className='panel-body pa-0'>
                <div className>
                  <div className='col-lg-3 col-md-4 file-directory pa-0'>
                    <div className='ibox float-e-margins'>
                      <div className='ibox-content'>
                        <div className='file-manager'>
                          <div className='mt-20 mb-20 ml-15 mr-15'>
                            <div className='fileupload btn btn-success btn-anim btn-block'>
                              <i className='fa fa-upload' />
                              <span className='btn-text' for='file_upload'>
                                Upload file
                              </span>
                              <input
                                id='file_upload'
                                type='file'
                                className='upload'
                                onChange={handleUploadFile}
                              />
                            </div>
                          </div>

                          <h6 className='mb-10 pl-15'>Folders</h6>
                          <ul className='folder-list mb-30'>
                            <li
                              className={
                                currentFolder === 'face_data' ? 'active' : ''
                              }
                            >
                              <a
                                id='face_data'
                                href='/'
                                onClick={handleClickFolder}
                              >
                                <i className='zmdi zmdi-folder' /> Face data
                              </a>
                            </li>
                            <li
                              className={
                                currentFolder === 'student_card' ? 'active' : ''
                              }
                            >
                              <a
                                id='student_card'
                                href='/'
                                onClick={handleClickFolder}
                              >
                                <i className='zmdi zmdi-folder' /> Student ID
                              </a>
                            </li>
                            <li
                              className={
                                currentFolder === 'id_card' ? 'active' : ''
                              }
                            >
                              <a
                                id='id_card'
                                href='/'
                                onClick={handleClickFolder}
                              >
                                <i className='zmdi zmdi-folder' /> CMND/ CCCD
                              </a>
                            </li>
                          </ul>

                          <div className='clearfix' />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-9 col-md-8 file-sec pt-20'>
                    <div className='row'>
                      <div className='col-lg-12'>
                        <div className='row'>
                          {currentStudent &&
                            currentStudent.images &&
                            currentStudent.images
                              .filter((x) => x.type === currentFolder)
                              .map((image, index) => (
                                <div
                                  className='col-lg-4 col-md-4 col-sm-6 col-xs-12  file-box'
                                  key={index}
                                >
                                  <div className='file'>
                                    <a href={image.imageUrl}>
                                      <div
                                        className='image'
                                        style={{
                                          backgroundImage: `url(https://drive.google.com/thumbnail?id=${image.imageId})`
                                        }}
                                      ></div>
                                      <div className='file-name'>
                                        {image.originFileName}
                                        <br />
                                        <span>
                                          Created date:{' '}
                                          {formatDate(
                                            new Date(image.created_at)
                                          )}
                                        </span>
                                      </div>
                                      <div className='file-name'>
                                        <button
                                          id={image.id}
                                          className='btn btn-danger'
                                          onClick={handleDeleteImage}
                                        >
                                          <i className='fa fa-trash'></i>Delete
                                          image{' '}
                                        </button>
                                      </div>
                                    </a>
                                  </div>
                                </div>
                              ))}
                        </div>
                      </div>
                    </div>
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

export default StudentDetail
