import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { formatDate, formatTime } from '../../helper/utils'
import { getIdentity } from '../../services/api/client'

import { WebcamCapture } from '../webcam/WebcamCapture'

function VerificationResult() {
  let { resultId , id} = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    if (resultId) dispatch(getIdentity(resultId))
  }, [dispatch, resultId])
  const identity = useSelector((state) => state.client.identityResult)
  const user = useSelector((state) => state.auth.currentUser)
  return (
    <div className='container-fluid'>
      {/* Title */}
      <div className='row heading-bg'>
        <div className='col-lg-3 col-md-4 col-sm-4 col-xs-12'>
          <h5 className='txt-dark'>Kết quả điểm danh</h5>
        </div>
        {/* Breadcrumb */}
        <div className='col-lg-9 col-sm-8 col-md-8 col-xs-12'>
          <ol className='breadcrumb'>
            <li>
              <a href='index.html'>{user?.studentId}</a>
            </li>
            <li>
              <a href={`/room/${id}`}>
                <span>Kết quả điểm danh</span>
              </a>
            </li>
            <li className='active'>
              <span>{identity?.id}</span>
            </li>
          </ol>
        </div>
        {/* /Breadcrumb */}
      </div>
      {/* /Title */}
      {/* Row */}
      <div className='row'>
        <div className='col-md-6'>
          <div className='panel panel-default card-view'>
            <div className='panel-heading'>
              <div className='pull-left'>
                <h6 className='panel-title txt-dark'>Thông tin chi tiết</h6>
              </div>
              <div className='clearfix' />
            </div>
            <div className='panel-wrapper collapse in'>
              <div className='panel-body'>
                <p className='muted'>
                  MSSV <code>{identity?.studentId}</code>
                </p>
                <p className='muted'>
                  Email <code>{identity?.email}</code>
                </p>
                <p className='muted'>
                  Phòng thi{' '}
                  <a href={`/room/${identity?.room.id}`}>
                    {' '}
                    <code>{identity?.room?.name}</code>
                  </a>
                </p>
                <p className='muted'>
                  Mã phòng thi <code>{identity?.room?.roomCode}</code>
                </p>
                <p className='muted'>
                  Zoom ID <code>{identity?.room?.zoomId}</code>
                </p>
                <p className='muted'>
                  Môn thi <code>{identity?.room?.name}</code>
                </p>
                <p className='muted'>
                  Thời gian điểm danh{' '}
                  <code>
                    {formatTime(new Date(identity?.created_at))}
                  </code>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-6'>
          <div className='panel panel-default card-view'>
            <div className='panel-heading'>
              <div className='pull-left'>
                <h6 className='panel-title txt-dark'>Hình ảnh điểm danh</h6>
              </div>
              <div className='clearfix' />
            </div>
            <div className='panel-wrapper collapse in'>
              <div className='panel-body'>
                <div
                  id='carousel-example-captions-1'
                  data-ride='carousel'
                  className='carousel slide'
                >
                  <img
                    src={identity?.faceImage.fetchUrl}
                    alt='Ảnh khuôn mặt điểm danh'
                    style={{ width: '580px' }}
                  />
                </div>
                {/* END carousel*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerificationResult
