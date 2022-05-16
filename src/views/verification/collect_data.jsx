import React from 'react'
import { useSelector } from 'react-redux'
import { WebcamDataPrivate } from '../webcam/WebcamDataPrivate'

function VerificationCollectData() {
  const user = useSelector((state) => state.auth.currentUser)
  return (
    <div className='container-fluid'>
      {/* Title */}
      <div className='row heading-bg'>
        <div className='col-lg-3 col-md-4 col-sm-4 col-xs-12'>
          <h5 className='txt-dark'>Dữ liệu khuôn mặt</h5>
        </div>
        {/* Breadcrumb */}
        <div className='col-lg-9 col-sm-8 col-md-8 col-xs-12'>
          <ol className='breadcrumb'>
            <li>
              <a href='index.html'>{user?.studentId}</a>
            </li>

            <li className='active'>
              <span>Thu thập dữ liệu định danh</span>
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
            <div className='panel-heading'></div>
            <div className='panel-wrapper collapse in'>
              <div className='panel-body'>
                <WebcamDataPrivate studentId={user?.studentId} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Row */}
    </div>
  )
}

export default VerificationCollectData