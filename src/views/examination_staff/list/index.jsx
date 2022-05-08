import React from 'react';
function ExaminationStaffList() {
    return (
      <div className='container-fluid'>
        {/* Title */}
        <div className='row heading-bg'>
          <div className='col-lg-3 col-md-4 col-sm-4 col-xs-12'>
            <h5 className='txt-dark'>Danh sách cán bộ coi thi</h5>
          </div>
          {/* Breadcrumb */}
          <div className='col-lg-9 col-sm-8 col-md-8 col-xs-12'>
            <ol className='breadcrumb'>
              <li>
                <a href='index.html'>Quản lý</a>
              </li>
              <li className='active'>
                <span>Cán bộ coi thi</span>
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
              <div className='panel-heading'>
                <div className='pull-right'>
                  <button class='btn btn-primary btn-lable-wrap left-label'>
                    {' '}
                    <span class='btn-label'>
                      <i class='fa fa-plus'></i>{' '}
                    </span>
                    <span class='btn-text'>Thêm cán bộ coi thi</span>
                  </button>
                </div>
                <div className='clearfix' />
              </div>
              <div className='panel-wrapper collapse in'>
                <div className='panel-body'>
                  <div className='table-wrap'>
                    <div className='table-responsive'>
                      <table
                        id='datable_1'
                        className='table  display table-hover mb-30'
                        data-page-size={10}
                      >
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Mã CBCT</th>
                            <th>Họ và tên</th>
                            <th>Email</th>
                            <th>Ngày sinh</th>
                            <th>Giới tính</th>
                            <th>Số điện thoại</th>
                            <th>Trạng thái</th>
                            <th>Tác vụ</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td>Tiger Nixon</td>
                            <td>System Architect</td>
                            <td>Edinburgh</td>
                            <td>61</td>
                            <td>2011/04/25</td>
                            <td>$320,800</td>
                            <td>2011/04/25</td>
                            <td>$320,800</td>
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

                          <tr>
                            <td>Michael Bruce</td>
                            <td>Javascript Developer</td>
                            <td>Singapore</td>
                            <td>29</td>
                            <td>2011/06/27</td>
                            <td>$183,000</td>
                            <td>2011/04/25</td>
                            <td>$320,800</td>
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
                          <tr>
                            <td>Donna Snider</td>
                            <td>Customer Support</td>
                            <td>New York</td>
                            <td>27</td>
                            <td>2011/01/25</td>
                            <td>$112,000</td>
                            <td>2011/04/25</td>
                            <td>$320,800</td>
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
            </div>
          </div>
        </div>
        {/* /Row */}
      </div>
    )
}

export default ExaminationStaffList;