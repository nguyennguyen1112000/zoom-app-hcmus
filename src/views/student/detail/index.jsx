import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { formatDate } from '../../../helper/utils'
import { deleteImage, uploadImage } from '../../../services/api/image'
import { getStudent } from '../../../services/api/student'

function StudentDetail() {
  const [currentFolder, setCurrentFolder] = useState('student_card')
  //const [, forceRender] = React.useState({})
  const dispatch = useDispatch()
  let { id } = useParams()
  useEffect(() => {
    if (id) dispatch(getStudent(id))
  }, [dispatch, id])
  const currentStudent = useSelector((state) => state.student.currentStudent)
  console.log('student', currentStudent)

  const handleClickFolder = (e) => {
    e.preventDefault()
    setCurrentFolder(e.currentTarget.id)
  }
  // const reload = ()=>{
  //   console.log('123');

  //   forceRender({})
  // }
  const handleUploadFile = (e) => {
    let file = e.target.files[0]
    console.log(file)

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
              <a href='index.html'>Quản lý</a>
            </li>
            <li>
              <a href='/student'>
                <span>Sinh viên</span>
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
                <h6 className='panel-title txt-dark'>Thông tin sinh viên</h6>
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
                    {currentStudent && (
                      <tbody>
                        <tr>
                          <td className='table-title-cell '>MSSV</td>
                          <td colSpan={7}>{currentStudent.studentId}</td>
                        </tr>
                        <tr>
                          <td className='table-title-cell '>Họ và tên</td>
                          <td colSpan={7}>
                            {currentStudent.firstName +
                              ' ' +
                              currentStudent.lastName}
                          </td>
                        </tr>
                        <tr>
                          <td className='table-title-cell'>Giới tính</td>
                          <td colSpan={7}>
                            {' '}
                            {currentStudent.gender ? 'Nam' : 'Nữ'}
                          </td>
                        </tr>
                        <tr>
                          <td className='table-title-cell'>Lớp</td>
                          <td colSpan={7}>18CTT4</td>
                        </tr>
                        <tr>
                          <td className='table-title-cell'>Ngày sinh</td>
                          <td colSpan={7}>
                            {formatDate(new Date(currentStudent.birthday))}
                          </td>
                        </tr>

                        <tr>
                          <th className='table-title-cell'>Ngành</th>
                          <td colSpan={7}>{currentStudent.major}</td>
                        </tr>
                        <tr>
                          <th className='table-title-cell'>Chương trình</th>
                          <td colSpan={7}>{currentStudent.educationLevel}</td>
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
                                Tải lên file
                              </span>
                              <input
                                id='file_upload'
                                type='file'
                                className='upload'
                                onChange={handleUploadFile}
                              />
                            </div>
                          </div>

                          <h6 className='mb-10 pl-15'>Thư mục</h6>
                          <ul className='folder-list mb-30'>
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
                                <i className='zmdi zmdi-folder' /> Thẻ sinh viên
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
                                <i className='zmdi zmdi-folder' /> Dữ liệu khuôn
                                mặt
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
                              .filter((x) => x.type == currentFolder)
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
                                          Ngày tạo:{' '}
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
                                          <i className='fa fa-trash'></i>Xóa ảnh{' '}
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
    </div>
  )
}

export default StudentDetail
