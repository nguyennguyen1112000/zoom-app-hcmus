import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useLocation } from 'react-router-dom'
import { getRoom } from '../../services/api/room'

import { WebcamCapture } from '../webcam/WebcamCapture'
import { WebcamID } from '../webcam/WebcamID'

function StudentVerificationS2() {
  const dispatch = useDispatch()
  let { id } = useParams()
  const user = useSelector((state) => state.auth.currentUser)
  useEffect(() => {
    if (id) dispatch(getRoom(id))
  }, [dispatch, id])
  const currentRoom = useSelector((state) => state.room.currentRoom)
  const { search } = useLocation()
  const [type, setType] = useState(0)

  return (
    <div className='container-fluid'>
      {/* Title */}
      <div className='row heading-bg'>
        {/* Breadcrumb */}
        <div className='col-lg-12 col-sm-8 col-md-8 col-xs-12'>
          <ol className='breadcrumb'>
            <li>
              <a href='/student'>{user?.studentId}</a>
            </li>
            <li>
              <a href='/room'>
                <span>Room</span>
              </a>
            </li>
            <li>
              <a href={`/room/${currentRoom?.id}`}>{currentRoom?.name}</a>
            </li>
            <li className='active'>
              <span>ID Verification</span>
            </li>
          </ol>
        </div>
      </div>

      <div className='row'>
        <div className='col-md-12'>
          <div className='panel panel-default card-view'>
            <div className='panel-wrapper collapse in'>
              <div className='panel-body'>
                <div className='col-sm-12'>
                  <div className='row'>
                    <div className='col-md-3'>
                      <div className='panel panel-default card-view'>
                        <div className='form-group mt-30 mb-30'>
                          <label className='control-label mb-10 text-left'>
                            Choose document type
                          </label>
                          <select
                            className='form-control'
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                          >
                            <option value={0}>
                              Student ID (Thẻ sinh viên)
                            </option>
                            <option value={1}>Identity Card (CMTND)</option>
                            <option value={3}>Citizen ID Card (CCCD)</option>
                          </select>
                        </div>
                       
                      </div>
                      <div className='panel panel-default card-view'>
                        <div className='panel-heading'>
                          <div className='pull-left'>
                            <h6 className='panel-title'>
                              Take a photo of your document type by the webcam.
                            </h6>
                          </div>
                          <div className='clearfix' />
                        </div>
                        <img
                          src='/img/id_verification_example.png'
                          alt=''
                          width={270}
                        />
                        <div className='panel-wrapper collapse in'>
                          <div className='panel-body'>
                            <ul className='list-icons'>
                              <li className='mb-10'>
                                <i className='fa fa-check text-danger mr-5' />
                                <span className='text-primary'>
                                  Turn up your brightness
                                </span>{' '}
                                and advoid glare
                              </li>
                              <li className='mb-10'>
                                <i className='fa fa-check text-danger mr-5' />
                                <span className='text-primary'>
                                  Full name
                                </span>{' '}
                                clearly visible
                              </li>
                              <li className='mb-10'>
                                <i className='fa fa-check text-danger mr-5' />
                                <span className='text-primary'>
                                  Date of birth
                                </span>{' '}
                                clearly visible
                              </li>
                              <li className='mb-10'>
                                <i className='fa fa-check text-danger mr-5' />
                                <span className='text-primary'>
                                  ID number
                                </span>{' '}
                                clearly visible
                              </li>
                              <li className='mb-10'>
                                <i className='fa fa-check text-danger mr-5' />
                                <span className='text-primary'>
                                  Fully in frame,
                                </span>{' '}
                                not cut off of any side
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-9'>
                      <WebcamID
                        roomId={currentRoom?.id}
                        studentId={user?.studentId}
                        type={type}
                      />
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

export default StudentVerificationS2
