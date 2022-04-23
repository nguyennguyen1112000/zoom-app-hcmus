import React from 'react';
import PropTypes from 'prop-types';



function StudentList() {
    return (
      <div className='container-fluid'>
        {/* Title */}
        <div className='row heading-bg'>
          <div className='col-lg-3 col-md-4 col-sm-4 col-xs-12'>
            <h5 className='txt-dark'>Danh sách sinh viên</h5>
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
                            href='#myModal'
                            data-toggle='modal'
                            title='Compose'
                            className='btn btn-success btn-block'
                          >
                            Thêm sinh viên
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
                          {/* Modal */}
                          <div
                            aria-hidden='true'
                            role='dialog'
                            tabIndex={-1}
                            id='myModal'
                            className='modal fade'
                            style={{ display: 'none' }}
                          >
                            <div className='modal-dialog'>
                              <div className='modal-content'>
                                <div className='modal-header'>
                                  <button
                                    type='button'
                                    className='close'
                                    data-dismiss='modal'
                                    aria-hidden='true'
                                  >
                                    ×
                                  </button>
                                  <h4 className='modal-title' id='myModalLabel'>
                                    Add New Contact
                                  </h4>
                                </div>
                                <div className='modal-body'>
                                  <form className='form-horizontal form-material'>
                                    <div className='form-group'>
                                      <div className='col-md-12 mb-20'>
                                        <input
                                          type='text'
                                          className='form-control'
                                          placeholder='Type name'
                                        />
                                      </div>
                                      <div className='col-md-12 mb-20'>
                                        <input
                                          type='text'
                                          className='form-control'
                                          placeholder='Email'
                                        />
                                      </div>
                                      <div className='col-md-12 mb-20'>
                                        <input
                                          type='text'
                                          className='form-control'
                                          placeholder='Phone'
                                        />
                                      </div>
                                      <div className='col-md-12 mb-20'>
                                        <input
                                          type='text'
                                          className='form-control'
                                          placeholder='Designation'
                                        />
                                      </div>
                                      <div className='col-md-12 mb-20'>
                                        <input
                                          type='text'
                                          className='form-control'
                                          placeholder='Age'
                                        />
                                      </div>
                                      <div className='col-md-12 mb-20'>
                                        <input
                                          type='text'
                                          className='form-control'
                                          placeholder='Date of joining'
                                        />
                                      </div>
                                      <div className='col-md-12 mb-20'>
                                        <input
                                          type='text'
                                          className='form-control'
                                          placeholder='Salary'
                                        />
                                      </div>
                                      <div className='col-md-12 mb-20'>
                                        <div className='fileupload btn btn-danger btn-rounded waves-effect waves-light'>
                                          <span>
                                            <i className='ion-upload m-r-5' />
                                            Upload Contact Image
                                          </span>
                                          <input
                                            type='file'
                                            className='upload'
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                                <div className='modal-footer'>
                                  <button
                                    type='button'
                                    className='btn btn-info waves-effect'
                                    data-dismiss='modal'
                                  >
                                    Save
                                  </button>
                                  <button
                                    type='button'
                                    className='btn btn-default waves-effect'
                                    data-dismiss='modal'
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                              {/* /.modal-content */}
                            </div>
                            {/* /.modal-dialog */}
                          </div>
                          {/* /.modal */}
                        </div>
                        <ul className='inbox-nav mb-30'>
                          <li className='active'>
                            <a href='#'>
                              Work{' '}
                              <span className='label label-primary ml-10'>
                                12
                              </span>
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              design{' '}
                              <span className='label label-danger ml-10'>
                                20
                              </span>
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              family{' '}
                              <span className='label label-warning ml-10'>
                                2
                              </span>
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              friends
                              <span className='label label-info ml-10'>30</span>
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              office{' '}
                              <span className='label label-success ml-10'>
                                2
                              </span>
                            </a>
                          </li>
                        </ul>
                        <a
                          className='txt-success create-label  pa-15'
                          href='javascript:void(0)'
                          data-toggle='modal'
                          data-target='#myModal_1'
                        >
                          + Create New Label
                        </a>
                        <div
                          id='myModal_1'
                          className='modal fade in'
                          tabIndex={-1}
                          role='dialog'
                          aria-labelledby='myModalLabel'
                          aria-hidden='true'
                        >
                          <div className='modal-dialog'>
                            <div className='modal-content'>
                              <div className='modal-header'>
                                <button
                                  type='button'
                                  className='close'
                                  data-dismiss='modal'
                                  aria-hidden='true'
                                >
                                  ×
                                </button>
                                <h5 className='modal-title' id='myModalLabel'>
                                  Add Lable
                                </h5>
                              </div>
                              <div className='modal-body'>
                                <form>
                                  <div className='form-group'>
                                    <label className='control-label mb-10'>
                                      Name of Label
                                    </label>
                                    <input
                                      type='text'
                                      className='form-control'
                                      placeholder='Type name'
                                    />
                                  </div>
                                  <div className='form-group'>
                                    <label className='control-label mb-10'>
                                      Select Number of people
                                    </label>
                                    <select className='form-control'>
                                      <option>All Contacts</option>
                                      <option>10</option>
                                      <option>20</option>
                                      <option>30</option>
                                      <option>40</option>
                                      <option>Custom</option>
                                    </select>
                                  </div>
                                </form>
                              </div>
                              <div className='modal-footer'>
                                <button
                                  type='button'
                                  className='btn btn-success waves-effect'
                                  data-dismiss='modal'
                                >
                                  Save
                                </button>
                                <button
                                  type='button'
                                  className='btn btn-default waves-effect'
                                  data-dismiss='modal'
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                            {/* /.modal-content */}
                          </div>
                          {/* /.modal-dialog */}
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
                                      <th>MSSV </th>
                                      <th>Họ và tên </th>
                                      <th>Email</th>
                                      <th>Giới tính</th>
                                      <th>Ngày sinh</th>
                                      <th>Lớp học</th>
                                      <th>Tác vụ</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>1</td>
                                      <td>18120486</td>
                                      <td>
                                        <a href='#'>Nguyễn Bình Nguyên</a>
                                      </td>
                                      <td>bnguyen.hcmus@gmail.com</td>
                                      <td>Nam</td>
                                      <td>11/01/2000</td>
                                      <td>18CTT4</td>
                                     
                                     
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

export default StudentList;