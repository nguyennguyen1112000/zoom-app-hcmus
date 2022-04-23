import React from 'react';
function RoomList() {
    return (
      <div className='container-fluid'>
        {/* Title */}
        <div className='row heading-bg'>
          <div className='col-lg-3 col-md-4 col-sm-4 col-xs-12'>
            <h5 className='txt-dark'>Danh sách phòng Zoom</h5>
          </div>
          {/* Breadcrumb */}
          <div className='col-lg-9 col-sm-8 col-md-8 col-xs-12'>
            <ol className='breadcrumb'>
              <li>
                <a href='index.html'>Dashboard</a>
              </li>
              <li>
                <a href='#'>
                  <span>apps</span>
                </a>
              </li>
              <li className='active'>
                <span>DSSV</span>
              </li>
            </ol>
          </div>
          {/* /Breadcrumb */}
        </div>
        {/* /Title */}
        {/* Row */}
        <div className='row'>
          <div className='col-lg-12'>
            <div className='panel panel-default card-view pa-0'>
              <div className='panel-wrapper collapse in'>
                <div className='panel-body pa-0'>
                  <div className='contact-list'>
                    <div className='row'>
                      <aside className='col-lg-2 col-md-4 pr-0'>
                        <div className='mt-20 mb-20 ml-15 mr-15'>
                          <a
                            href='/room/create'
                            data-toggle='modal'
                            title='Compose'
                            className='btn btn-success btn-block'
                          >
                            Thêm phòng Zoom
                          </a>
                          <a
                            href='/'
                            title='Compose'
                            className='btn btn-success btn-block'
                          >
                            <i className='fa fa-cloud-download'></i>
                            Tải về mẫu
                          </a>
                          <a
                            href='/'
                            title='Compose'
                            className='btn btn-danger btn-block'
                          >
                            <i className='fa fa-cloud-upload'></i>
                            Tải lên danh sách
                          </a>
                        </div>
                      </aside>
                      <aside className='col-lg-10 col-md-8 pl-0'>
                        <div className='panel pa-0'>
                          <div className='panel-wrapper collapse in'>
                            <div className='panel-body  pa-0'>
                              <div className='table-responsive mb-30'>
                                <table
                                  id='datable_1'
                                  className='table  display table-hover mb-30'
                                  data-page-size={10}
                                >
                                  <thead>
                                    <tr>
                                      <th>STT</th>
                                      <th>Tên phòng </th>
                                      <th>ZoomId </th>
                                      <th>Passcode</th>
                                      <th>Link</th>
                                      <th>Môn thi</th>
                                      <th>Lớp</th>
                                      <th>Ngày thi</th>
                                      <th>Giờ thi</th>
                                      <th>Số SV</th>
                                      <th>Tác vụ</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>1</td>
                                      <td>Thi GK - Lập trình HĐT</td>
                                      <td>
                                        <a href='#'>744 731 3271</a>
                                      </td>
                                      <td>035172</td>
                                      <td>
                                        <a href='https://us05web.zoom.us/j/7447313271?pwd=TWw4V3pGVDJscEVBVVN3bkQ5d3NFZz09'>
                                          Mở trong Zoom
                                        </a>
                                      </td>
                                      <td>Lập trình HĐT</td>
                                      <td>18CTT4</td>
                                      <td>23/04/2022</td>
                                      <td>07:00 - 08:30</td>
                                      <td>25</td>

                                      <td>
                                        <a
                                          href='javascript:void(0)'
                                          className='text-inverse pr-10'
                                          title='Edit'
                                          data-toggle='tooltip'
                                        >
                                          <i className='zmdi zmdi-edit txt-warning' />
                                        </a>
                                        <a
                                          href='javascript:void(0)'
                                          className='text-inverse'
                                          title='Delete'
                                          data-toggle='tooltip'
                                        >
                                          <i className='zmdi zmdi-delete txt-danger' />
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </aside>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Row */}
      </div>
    )
}

export default RoomList;