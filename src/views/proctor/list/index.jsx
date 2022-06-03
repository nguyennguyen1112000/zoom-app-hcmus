/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyRooms, getRooms } from '../../../services/api/room'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import swal from 'sweetalert'
import { authHeader, handleExpiredToken, tConv24 } from '../../../helper/utils'
import { Link } from 'react-router-dom'
import { getAllUsers } from '../../../services/api/users'

const API_URL = process.env.REACT_APP_API_URL
function ProctorList() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.currentUser)

  const userList = useSelector((state) => state.user.userList)
  console.log('users', userList)

  const [reload, setReload] = useState(false)
  const [select, setSelect] = useState([])
  useEffect(() => {
    setTimeout(() => {
      $('#datable_1').DataTable().destroy()

      dispatch(getAllUsers('proctor'))
    }, 2000)
  }, [reload])
  useEffect(() => {
    $('#datable_1').DataTable()
  }, [userList, reload])

  const [errors, setErrors] = useState({
    emails: null
  })

  function validateEmails() {
    let isValid = true
    var errs = {}
    const emails = $('#tagsinput').tagsinput('items')
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    )
    if (emails?.length === 0) {
      isValid = false
      errs.emails = 'Emails are required'
    }
    emails?.forEach((mail) => {
      if (!pattern.test(mail)) {
        isValid = false
        errs.emails = 'Invalid email addresses'
      }
    })
    setErrors(errs)
    console.log(errs)

    return isValid
  }
  function handleSubmit(event) {
    event.preventDefault()

    if (validateEmails()) {
      const emails = $('#tagsinput').tagsinput('items')
      console.log('emails', emails)

      axios
        .post(`${API_URL}/users/proctor`, emails, authHeader())
        .then((res) => {
          setErrors({ emails: null })
          toast.success('Add proctors successfully', {
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
  }
  const downloadTemplate = (e) => {
    e.preventDefault()
    const downloadLink = `${API_URL}/users/template/proctor`
    const a = document.createElement('a')
    a.href = downloadLink
    a.click()
  }
  
  /************* Xóa *********** */
  const handleSelect = (e) => {
    const index = e.currentTarget.getAttribute('index')
    const checked = e.target.checked
    if (checked) setSelect([...select, parseInt(index)])
    else setSelect(select.filter((x) => x != parseInt(index)))
  }
  const handleSelectAll = (e) => {
    const checked = e.target.checked
    if (checked) setSelect(userList.map((user) => user.id))
    else setSelect([])
  }
  const isChecked = (index) => {
    return select.includes(index)
  }
  const handleDelete = (e) => {
    e.preventDefault()
    axios
      .delete(`${API_URL}/users`, {
        data: select,
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
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
  /************* Upload file *********** */

  const uploadFile = (e) => {
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    axios
      .post(`${API_URL}/users/upload`, formData, authHeader())
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
              <a href='index.html'>HCMUSID</a>
            </li>

            <li className='active'>
              <span>Proctor</span>
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
                  <button
                    class='btn btn-danger btn-square'
                    onClick={handleDelete}
                  >
                    <span class='btn-label'>
                      <i class='fa fa-trash'></i>
                    </span>
                  </button>
                </div>
              )}
              <div className='pull-right button-list'>
                <button class='btn btn-success btn-square btn-outline' onClick={downloadTemplate}>
                  <span class='btn-label'>
                    <i class='fa fa-download'></i>
                  </span>
                </button>
                <button class='btn btn-danger btn-outline btn-square fileupload'>
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
                <button
                  type='button'
                  className='btn btn-primary btn-square'
                  data-toggle='modal'
                  data-target='#myModal'
                >
                  <span class='btn-label'>
                    <i class='fa fa-plus'></i>
                  </span>
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
                        <h5 className='modal-title'>Add new Proctor</h5>
                      </div>
                      <div className='modal-body'>
                        <form>
                          <div className='form-group'>
                            <label
                              htmlFor='recipient-name'
                              className='control-label mb-10'
                            >
                              Add <code>emails</code> of protors
                            </label>
                            <div className='tags-default mt-40'>
                              <input
                                type='text'
                                id='tagsinput'
                                data-role='tagsinput'
                                placeholder='Add Emails'
                                name='emails'
                              />
                            </div>
                            {errors.emails && (
                              <div className='help-block with-errors text-danger'>
                                {errors.emails}
                              </div>
                            )}
                          </div>
                        </form>
                      </div>
                      <div className='modal-footer'>
                        <button
                          type='button'
                          className='btn btn-default'
                          data-dismiss='modal'
                        >
                          Cancel
                        </button>
                        <button
                          type='button'
                          className='btn btn-danger'
                          onClick={handleSubmit}
                        >
                          Add
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
                <div className='table-wrap mb-0'>
                  <div className='table-responsive'>
                    <table
                      id='datable_1'
                      className='table table-hover display  pb-30'
                    >
                      <thead>
                        <tr>
                          <th>
                            {userList && (
                              <input
                                type='checkbox'
                                name='checkbox'
                                index='all'
                                onChange={handleSelectAll}
                              />
                            )}
                          </th>
                          <th>#</th>

                          <th>Proctor ID </th>
                          <th>Full name</th>
                          <th>Email </th>
                          <th>Birthday</th>
                          <th>Gender</th>
                          <th>Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {userList?.map((user, index) => (
                          <tr>
                            <td>
                              <input
                                type='checkbox'
                                name='checkbox'
                                index={user.id}
                                onChange={handleSelect}
                                checked={isChecked(user.id)}
                              />
                            </td>
                            <td>{index + 1}</td>
                            <td>
                              <a href={`/proctor/${user.id}`}></a>
                              {user.staffCode}
                            </td>
                            <td>{user.firstName+" "+user.lastName}</td>
                            <td>{user.email}</td>
                            <td></td>
                            <td></td>
                            <td>
                              {user.status === 'active' && (
                                <span className='label label-success'>
                                  {user.status}
                                </span>
                              )}
                              {user.status === 'pending' && (
                                <span className='label label-warning'>
                                  {user.status}
                                </span>
                              )}
                              {user.status === 'banned' && (
                                <span className='label label-danger'>
                                  {user.status}
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

export default ProctorList
