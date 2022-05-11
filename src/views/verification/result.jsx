import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { formatDate, formatTime } from '../../helper/utils'
import { getIdentity } from '../../services/api/client'

import { WebcamCapture } from '../webcam/WebcamCapture'

function VerificationResult() {
  let { id } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    if (id) dispatch(getIdentity(id))
  }, [dispatch, id])
  const identity = useSelector((state) => state.client.identityResult)
  console.log(identity)
  return (
    <>
      <header className='sp-header'>
        <div className='sp-logo-wrap pull-left'>
          <a href='index.html'>
            <img className='brand-img mr-10' src='/img/logo.png' alt='brand' />
            <span className='brand-text'>HCMUSID</span>
          </a>
        </div>
        <div className='clearfix' />
      </header>
      <div
        className='page-wrapper pa-0 ma-0 auth-page'
        style={{ minHeight: '420px' }}
      >
        <div className='container-fluid'>
          {/* Row */}
          <div
            className='table-struct full-width full-height'
            style={{ height: '420px' }}
          >
            <div className='table-cell vertical-align-middle auth-form-wrap'>
              <div className='auth-form  ml-auto mr-auto no-float'>
                <div className='row'>
                  <div className='col-sm-12 col-xs-12'>
                    <div className='mb-30'>
                      <h3 className='text-center txt-dark mb-10'>
                        Kết quả định danh
                      </h3>
                      <h6 className='text-center nonecase-font txt-grey'></h6>
                    </div>
                    <div className='form-wrap'>
                      <div className='panel panel-default card-view'>
                        <div className='panel-wrapper collapse in'>
                          <div className='panel-body row pa-0'>
                            <div className='table-wrap'>
                              <div className='table-responsive'>
                                <table className='table table-hover mb-0'>
                                  {identity && (
                                    <tbody>
                                      <tr>
                                        <td>MSSV</td>
                                        <td>
                                          <div className='progress progress-xs mb-0 '>
                                            <div
                                              className='progress-bar progress-bar-danger'
                                              style={{ width: '35%' }}
                                            />
                                          </div>
                                        </td>
                                        <td>{identity.studentId}</td>
                                      </tr>
                                      <tr>
                                        <td>Email</td>
                                        <td>
                                          <div className='progress progress-xs mb-0 '>
                                            <div
                                              className='progress-bar progress-bar-warning'
                                              style={{ width: '50%' }}
                                            />
                                          </div>
                                        </td>
                                        <td>{identity.zoomEmail}</td>
                                      </tr>
                                      <tr>
                                        <td>ZoomId</td>
                                        <td>
                                          <div className='progress progress-xs mb-0 '>
                                            <div
                                              className='progress-bar progress-bar-success'
                                              style={{ width: '100%' }}
                                            />
                                          </div>
                                        </td>
                                        <td>{identity.room.zoomId}</td>
                                      </tr>
                                      <tr>
                                        <td>Link zoom</td>
                                        <td>
                                          <div className='progress progress-xs mb-0 '>
                                            <div
                                              className='progress-bar progress-bar-primary'
                                              style={{ width: '70%' }}
                                            />
                                          </div>
                                        </td>
                                        <td>{identity.room.url}</td>
                                      </tr>
                                      <tr>
                                        <td>Mã môn thi</td>
                                        <td>
                                          <div className='progress progress-xs mb-0 '>
                                            <div
                                              className='progress-bar progress-bar-primary'
                                              style={{ width: '85%' }}
                                            />
                                          </div>
                                        </td>
                                        <td>
                                          {identity.room.subject.subjectCode}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Môn thi</td>
                                        <td>
                                          <div className='progress progress-xs mb-0 '>
                                            <div
                                              className='progress-bar progress-bar-warning'
                                              style={{ width: '50%' }}
                                            />
                                          </div>
                                        </td>
                                        <td>{identity.room.subject.name}</td>
                                      </tr>
                                      <tr>
                                        <td>Phòng thi</td>
                                        <td>
                                          <div className='progress progress-xs mb-0 '>
                                            <div
                                              className='progress-bar progress-bar-warning'
                                              style={{ width: '50%' }}
                                            />
                                          </div>
                                        </td>
                                        <td>{identity.room.roomCode}</td>
                                      </tr>
                                      <tr>
                                        <td>Thời gian định danh</td>
                                        <td>
                                          <div className='progress progress-xs mb-0 '>
                                            <div
                                              className='progress-bar progress-bar-danger'
                                              style={{ width: '70%' }}
                                            />
                                          </div>
                                        </td>
                                        <td>
                                          {formatTime(
                                            new Date(identity.created_at)
                                          )}
                                        </td>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Row */}
        </div>
      </div>
    </>
  )
}

export default VerificationResult
