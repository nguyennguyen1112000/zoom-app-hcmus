import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getMyImages } from '../../services/api/image'
import { getRoom } from '../../services/api/room'
import { RealtimeWebcam } from '../webcam/RealtimeWebcam'

import { WebcamCapture } from '../webcam/WebcamCapture'

function StudentVerificationS1() {
  const dispatch = useDispatch()
  let { id } = useParams()
  const user = useSelector((state) => state.auth.currentUser)
  const images = useSelector((state) => state.image.imageList)
  useEffect(() => {
    if (id) dispatch(getRoom(id))
    dispatch(getMyImages())
  }, [dispatch, id])
  const currentRoom = useSelector((state) => state.room.currentRoom)
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
              <span>Face recognition</span>
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
                  {images.length > 0 ? (
                    <div className='row'>
                      <div className='col-md-3'>
                        <div className='panel panel-default card-view'>
                          <div className='panel-heading'>
                            <div className='pull-left'>
                              <h6 className='panel-title'>
                                Your reference face image
                              </h6>
                              {images.slice(0, 2).map((img) => (
                                <img
                                  src={img?.fetchUrl}
                                  alt='face_recognition_image'
                                  width={270}
                                  referrerpolicy='no-referrer'
                                />
                              ))}

                              <h6 className='panel-title mt-10'>
                                Please follow the instructions below
                              </h6>
                              <img
                                src='/img/face_recognition_instruction.png'
                                alt='face_recognition_instruction'
                                width={270}
                              />
                            </div>
                            <div className='clearfix' />
                          </div>
                        </div>
                      </div>
                      <div className='col-md-9'>
                        {/* <WebcamCapture
                          roomId={currentRoom?.id}
                          studentId={user?.studentId}
                        /> */}
                        <RealtimeWebcam
                          roomId={currentRoom?.id}
                          studentId={user?.studentId}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className='auth-form  ml-auto mr-auto no-float'>
                      <div className='row'>
                        <div className='col-sm-12 col-xs-12'>
                          <div className='mb-30'>
                            <span className='text-center nonecase-font mb-20 block error-comment'>
                              There is no reference face data. Please contact
                              your proctor!
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentVerificationS1
