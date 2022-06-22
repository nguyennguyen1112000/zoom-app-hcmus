import React from 'react';

function PageNotFound() {
    return (
      <div className='wrapper error-page pa-0'>
        <header className='sp-header'>
          <div className='sp-logo-wrap pull-left'>
            <a href='/'>
              <img
                className='brand-img mr-10'
                src='../img/logo.png'
                alt='brand'
              />
              <span className='brand-text'>HCMUSID</span>
            </a>
          </div>
          <div className='form-group mb-0 pull-right'>
            <a
              className='inline-block btn btn-primary btn-rounded btn-outline nonecase-font'
              href='/'
            >
              Back to Home
            </a>
          </div>
          <div className='clearfix' />
        </header>
        {/* Main Content */}
        <div
          className='page-wrapper pa-0 ma-0 error-bg-img'
          style={{ minHeight: '722px' }}
        >
          <div className='container-fluid'>
            {/* Row */}
            <div
              className='table-struct full-width full-height'
              style={{ height: '722px' }}
            >
              <div className='table-cell vertical-align-middle auth-form-wrap'>
                <div className='auth-form  ml-auto mr-auto no-float'>
                  <div className='row'>
                    <div className='col-sm-12 col-xs-12'>
                      <div className='mb-30'>
                        <span className='block error-head text-center txt-primary mb-10'>
                          404
                        </span>
                        <span className='text-center nonecase-font mb-20 block error-comment'>
                          Page Not Found
                        </span>
                        <p className='text-center'>
                          The URL may be misplaced or the pahe you are looking
                          is no longer available.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Row */}
          </div>
        </div>
        {/* /Main Content */}
      </div>
    )
}

export default PageNotFound;