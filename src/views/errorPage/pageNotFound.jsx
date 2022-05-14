import React from 'react';

function PageNotFound() {
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
          <div className='form-group mb-0 pull-right'>
            <a
              className='inline-block btn btn-success btn-rounded btn-outline nonecase-font'
              href='/'
            >
              Trở lại trang chủ
            </a>
          </div>
          <div className='clearfix' />
        </header>
        {/* Main Content */}
        <div
          className='page-wrapper pa-0 ma-0 error-bg-img'
          style={{ minHeight: '283px' }}
        >
          <div className='container-fluid'>
            {/* Row */}
            <div
              className='table-struct full-width full-height'
              style={{ height: '283px' }}
            >
              <div className='table-cell vertical-align-middle auth-form-wrap'>
                <div className='auth-form  ml-auto mr-auto no-float'>
                  <div className='row'>
                    <div className='col-sm-12 col-xs-12'>
                      <div className='mb-30'>
                        <span className='block error-head text-center txt-success mb-10'>
                          404
                        </span>
                        <span className='text-center nonecase-font mb-20 block error-comment'>
                          Không tìm thấy trang
                        </span>
                        <p className='text-center'>
                          URL có thể được đặt sai vị trí hoặc trang bạn đang tìm
                          kiếm không còn nữa.
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
      </>
    )
}

export default PageNotFound;