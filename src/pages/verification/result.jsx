import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { formatTime } from '../../helper/utils'
import { getIdentity } from '../../services/api/client'

function VerificationResult() {
  let { resultId, id } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    if (resultId) dispatch(getIdentity(resultId))
  }, [dispatch, resultId])
  const identity = useSelector((state) => state.client.identityResult)
  console.log(identity)
  const user = useSelector((state) => state.auth.currentUser)
  return (
    <div className='container-fluid'>
      {/* Title */}
      <div className='row heading-bg'>
        <div className='col-lg-3 col-md-4 col-sm-4 col-xs-12'></div>
        {/* Breadcrumb */}
        <div className='col-lg-9 col-sm-8 col-md-8 col-xs-12'>
          <ol className='breadcrumb'>
            <li>
              <a href={`/room/${id}`}>{user?.studentId}</a>
            </li>
            <li>
              <a href={`/room/${id}`}>
                <span>Identity Result</span>
              </a>
            </li>
            <li className='active'>
              <span>{identity?.id}</span>
            </li>
          </ol>
        </div>
        {/* /Breadcrumb */}
      </div>
      <div className='row'>
        <div className='col-lg-8 col-md-7 col-sm-12 col-xs-12'>
          <div className='panel panel-default card-view panel-refresh'>
            <div className='refresh-container'>
              <div className='la-anim-1' />
            </div>
            <div className='panel-heading'>
              <div className='pull-left'>
                <h6 className='panel-title txt-dark'>Identity information</h6>
              </div>

              <div className='clearfix' />
            </div>
            <div className='panel-wrapper collapse in'>
              <div className='panel-body row pa-0'>
                <div className='table-wrap'>
                  <div className='table-responsive'>
                    <table className='table table-hover mb-0'>
                      <thead>
                        <tr>
                          <th>Field</th>
                          <th>Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <span className='txt-dark weight-500'>
                              StudentId
                            </span>
                          </td>
                          <td>{identity?.studentId}</td>
                        </tr>
                        <tr>
                          <td>
                            <span className='txt-dark weight-500'>
                              Room name
                            </span>
                          </td>
                          <td>{identity?.room?.name}</td>
                        </tr>
                        <tr>
                          <td>
                            <span className='txt-dark weight-500'>
                              Room code
                            </span>
                          </td>
                          <td>{identity?.room?.roomCode}</td>
                        </tr>
                        <tr>
                          <td>
                            <span className='txt-dark weight-500'>Subject</span>
                          </td>
                          <td>{identity?.room?.subject?.name}</td>
                        </tr>
                        <tr>
                          <td>
                            <span className='txt-dark weight-500'>
                              Start check-in time
                            </span>
                          </td>
                          <td>
                            {identity?.created_at &&
                              formatTime(new Date(identity?.created_at))}
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
        <div className='col-lg-4 col-md-5 col-sm-12 col-xs-12'>
          <div className='panel panel-default card-view panel-refresh'>
            <div className='refresh-container'>
              <div className='la-anim-1' />
            </div>
            <div className='panel-heading'>
              <div className='pull-left'>
                <h6 className='panel-title txt-dark'>Identity images</h6>
              </div>
            </div>
            <div className='panel-body'>
              {' '}
              <div
                id='carousel-example-captions-1'
                data-ride='carousel'
                className='carousel slide'
              >
                <a
                  href={`${identity?.faceImage.imageUrl}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <img
                    src={identity?.faceImage.fetchUrl}
                    alt='face_recognition_image'
                    referrerpolicy='no-referrer'
                  />
                </a>
              </div>
              <div
                id='carousel-example-captions-1'
                data-ride='carousel'
                className='carousel slide'
              >
                <a
                  href={`${identity?.cardImage.imageUrl}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <img
                    src={identity?.cardImage.fetchUrl}
                    alt='face_recognition_image'
                    referrerpolicy='no-referrer'
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-lg-12 '>
          <div className='panel panel-default card-view'>
            <div className='panel-heading'>
              <div className='pull-left'>
                <a href={identity?.room?.url}>
                  <button className='btn btn-default btn-lable-wrap left-label'>
                    <span className='btn-label'>
                      <img src='/img/icons8-zoom.svg' width={20} alt="zoom_logo"/>
                    </span>
                    <span className='btn-text'>Return to Zoom meeting</span>
                  </button>
                </a>
              </div>
              <div className='clearfix' />
            </div>
            <div className='panel-wrapper collapse in'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerificationResult
