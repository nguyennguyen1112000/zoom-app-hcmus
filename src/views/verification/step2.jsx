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
                <span>Phòng thi</span>
              </a>
            </li>
            <li>
              <a href={`/room/${currentRoom?.id}`}>
                {currentRoom?.name}
              </a>
            </li>
            <li className='active'>
              <span>Điểm danh</span>
            </li>
          </ol>
        </div>
      </div>

      <div className='row'>
        <div className='col-md-12'>
          <div className='panel panel-default card-view'>
            <div className='panel-heading'>
              <div className='pull-left'>
                <h6 className='panel-title txt-dark'>Xác thực khuôn mặt</h6>
              </div>
              <div className='clearfix' />
            </div>
            <div className='panel-wrapper collapse in'>
              <div className='panel-body'>
                <WebcamCapture roomId={currentRoom?.id} studentId = {user?.studentId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentVerificationS1
