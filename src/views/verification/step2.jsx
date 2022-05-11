import React from 'react'

import { WebcamCapture } from '../webcam/WebcamCapture'
function VerificationStep2() {
  return (
    <>
      <header className='sp-header'>
        <div className='sp-logo-wrap pull-left'>
          <a href='index.html'>
            <img
              className='brand-img mr-10'
              src='../img/logo.png'
              alt='brand'
            />
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
                        Định danh khuôn mặt
                      </h3>
                      <h6 className='text-center nonecase-font txt-grey'></h6>
                    </div>
                    <div className='form-wrap'>
                      <WebcamCapture />
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

export default VerificationStep2
