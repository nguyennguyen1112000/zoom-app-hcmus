import React, { useState } from 'react'
import { WebcamData } from '../webcam/WebcamData'

function FaceData(props) {
  const [input, setInput] = useState({
    studentId: '',
    type: 'face_data',
    name: ''
  })
  const [err, setErr] = useState({
    studentId: null,
    name: null,
    type: 'face_data'
  })
  function handleChange(event) {
    switch (event.target.name) {
      case 'name':
        setInput({
          ...input,
          name: event.target.value
        })
        break
      case 'studentId':
        setInput({
          ...input,
          studentId: event.target.value
        })
        break
      case 'type':
        setInput({
          ...input,
          type: event.target.value
        })
        break
      default:
        break
    }
    validate();
  }
  function validate() {
    let isValid = true
    var errs = {}
    if (!input.name) {
      isValid = false
      errs.name = 'Họ tên là bắt buộc'
    }
    if (!input.studentId) {
      isValid = false
      errs.studentId = 'MSSV là bắt buộc'
    }
    if (input.studentId) {
      var pattern = new RegExp('^[0-9]*$')
      if (!pattern.test(input['studentId'])) {
        isValid = false
        errs.studentId = 'MSSV chỉ được chứa kí tự số'
      }
    }
    console.log('NNN')

    setErr(errs )

    return isValid
  }
  return (
    <div className='wrapper theme-1-active pimary-color-green'>
      {/* Top Menu Items */}
      <nav className='navbar navbar-inverse navbar-fixed-top'>
        <div className='mobile-only-brand pull-left'>
          <div className='nav-header pull-left'>
            <div className='logo-wrap'>
              <a href='index.html'>
                <img className='brand-img' src='../img/logo.png' alt='brand' />
                <span className='brand-text'>HCMUSID</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className='row heading-bg'></div>

      <div style={{ minHeight: '283px' }}>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='panel panel-default card-view pa-0'>
                <div className='panel-wrapper collapse in'>
                  <div className='panel-body pa-0'>
                    <div className>
                      <div className='col-lg-3 col-md-4 file-directory pa-0'>
                        <div className='ibox float-e-margins'>
                          <div className='ibox-content'>
                            <div className='file-manager'>
                              <div>
                                <div className='col-sm-12 col-xs-12'>
                                  <div className='form-wrap'>
                                    <form>
                                      <div className='form-group'>
                                        <label
                                          className='control-label mb-10'
                                          htmlFor='exampleInputuname_1'
                                        >
                                          MSSV
                                        </label>
                                        <div className='input-group'>
                                          <div className='input-group-addon'>
                                            <i className='icon-graduation' />
                                          </div>
                                          <input
                                            type='text'
                                            name='studentId'
                                            className='form-control'
                                            id='exampleInputuname_1'
                                            placeholder='MSSV'
                                            onChange={handleChange}
                                          />
                                        </div>
                                        {err.studentId && (
                                          <span className='text-danger'>
                                            {err.studentId}
                                          </span>
                                        )}
                                      </div>
                                      <div className='form-group'>
                                        <label
                                          className='control-label mb-10'
                                          htmlFor='exampleInputEmail_1'
                                        >
                                          Họ và tên
                                        </label>
                                        <div className='input-group'>
                                          <div className='input-group-addon'>
                                            <i className='icon-user' />
                                          </div>
                                          <input
                                            name='name'
                                            type='text'
                                            className='form-control'
                                            id='exampleInputEmail_1'
                                            placeholder='Nhập họ tên'
                                            onChange={handleChange}
                                          />
                                        </div>
                                        <span className='text-danger'>
                                          {err.name}
                                        </span>
                                      </div>
                                      <div className='form-group'>
                                        <label className='control-label mb-10'>
                                          Loại hình ảnh
                                        </label>
                                        <select
                                          className='form-control'
                                          name='type'
                                          onChange={handleChange}
                                        >
                                          <option value='face_data'>
                                            Khuôn mặt
                                          </option>

                                          <option value='id_card'>
                                            Thẻ sinh viên
                                          </option>
                                        </select>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>

                              <div className='clearfix' />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className='col-lg-9 col-md-8 file-sec pt-20'
                        style={{ background: '#aebcb4' }}
                      >
                        <div className='row'>
                          <div className='col-lg-12'>
                            <WebcamData input={input} validate={validate} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Row */}
        </div>
        {/* Footer */}
        <footer className='footer container-fluid pl-30 pr-30'>
          <div className='row'>
            <div className='col-sm-12'>
              <p>2017 © Nguyễn Bình Nguyên. Triệu Mai Ngọc Thức</p>
            </div>
          </div>
        </footer>
        {/* /Footer */}
      </div>
      {/* /Main Content */}
    </div>
  )
}

export default FaceData
