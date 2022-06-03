import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getRoom } from '../../services/api/room'

import { WebcamCapture } from '../webcam/WebcamCapture'

function StudentVerificationS1() {
  const dispatch = useDispatch()
  let { id } = useParams()
  const user = useSelector((state) => state.auth.currentUser)
  useEffect(() => {
    if (id) dispatch(getRoom(id))
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
                  <div className='row'>
                    <div className='col-md-3'>
                      <div className='panel panel-default card-view'>
                        <div className='panel-heading'>
                          <div className='pull-left'>
                            <h6 className='panel-title txt-primary'>
                              Center your face in the webcam
                            </h6>
                            <img
                              src='/img/face_recognition_example.png'
                              alt='face_recognition_example'
                              width={270}
                            />
                            <h6 className='panel-title txt-primary mt-10'>
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
                      <WebcamCapture
                        roomId={currentRoom?.id}
                        studentId={user?.studentId}
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

export default StudentVerificationS1
