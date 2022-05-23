import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userLogout } from '../../actions/auth'
import { logOut } from '../../helper/utils'

function LeftSideBar() {
  const dispatch = useDispatch()
  function handleLogout() {
    const action = userLogout()
    dispatch(action)
    logOut()
  }
  const user = useSelector((state) => state.auth.currentUser)

  return (
    <div className='fixed-sidebar-left'>
      {user.role !== 'student' && (
        <ul className='nav navbar-nav side-nav nicescroll-bar'>
          <li className='navigation-header'>
            <span>Quản lý chung</span>
            <i className='zmdi zmdi-more' />
          </li>
          <li>
            <a
              className='active'
              href='javascript:void(0);'
              data-toggle='collapse'
              data-target='#dashboard_dr'
            >
              <div className='pull-left'>
                <i className='fa fa-graduation-cap mr-20' />
                <span className='right-nav-text'>Sinh viên</span>
              </div>
              <div className='pull-right'>
                <i className='zmdi zmdi-caret-down' />
              </div>
              <div className='clearfix' />
            </a>
            <ul id='dashboard_dr' className='collapse collapse-level-1'>
              <li>
                <a className='active-page' href='/student'>
                  Danh sách
                </a>
              </li>
              <li>
                <a href='index2.html'>Hướng dẫn</a>
              </li>
            </ul>
          </li>
          <li>
            <a
              href='javascript:void(0);'
              data-toggle='collapse'
              data-target='#room'
            >
              <div className='pull-left'>
                <i className='fa fa-th-large mr-20' />
                <span className='right-nav-text'>Phòng thi</span>
              </div>
              <div className='pull-right'>
                <i className='zmdi zmdi-caret-down' />
              </div>
              <div className='clearfix' />
            </a>
            <ul id='room' className='collapse collapse-level-1'>
              <li>
                <a className='active-page' href='/room'>
                  Danh sách
                </a>
              </li>
             
            </ul>
          </li>
          <li>
            <a
              href='javascript:void(0);'
              data-toggle='collapse'
              data-target='#examination_staff'
            >
              <div className='pull-left'>
                <i className='fa fa-users mr-20' />
                <span className='right-nav-text'>Cán bộ coi thi</span>
              </div>
              <div className='pull-right'>
                <i className='zmdi zmdi-caret-down' />
              </div>
              <div className='clearfix' />
            </a>
            <ul id='examination_staff' className='collapse collapse-level-1'>
              <li>
                <a className='active-page' href='/examination_staff'>
                  Danh sách
                </a>
              </li>
              <li>
                <a href='index2.html'>Hướng dẫn</a>
              </li>
            </ul>
          </li>

          <li>
            <a
              href='javascript:void(0);'
              data-toggle='collapse'
              data-target='#ecom_dr'
            >
              <div className='pull-left'>
                <i className='zmdi zmdi-book mr-20' />
                <span className='right-nav-text'>Môn học</span>
              </div>
              
              <div className='clearfix' />
            </a>
          </li>

          <li>
            <hr className='light-grey-hr mb-10' />
          </li>
          <li className='navigation-header'>
            <span>Quản lý định danh</span>
            <i className='zmdi zmdi-more' />
          </li>

          <li>
            <a
              href='javascript:void(0);'
              data-toggle='collapse'
              data-target='#table_dr'
            >
              <div className='pull-left'>
                <i className='zmdi zmdi-search mr-20' />
                <span className='right-nav-text'>Tìm kiếm phòng thi</span>
              </div>

              <div className='clearfix' />
            </a>
          </li>
          <li>
            <a
              href='javascript:void(0);'
              data-toggle='collapse'
              data-target='#icon_dr'
            >
              <div className='pull-left'>
                <i className='zmdi zmdi-iridescent mr-20' />
                <span className='right-nav-text'>Hôm nay</span>
              </div>
              <div className='pull-right'>
                <i className='zmdi zmdi-caret-down' />
              </div>
              <div className='clearfix' />
            </a>
            <ul id='icon_dr' className='collapse collapse-level-1'>
              <li>
                <a href='fontawesome.html'>Thi CK Lập trình hướng đối tượng</a>
              </li>
              <li>
                <a href='themify.html'>Thi CK Lập trình Web</a>
              </li>
            </ul>
          </li>

          <li>
            <hr className='light-grey-hr mb-10' />
          </li>
          <li className='navigation-header'>
            <span>GIÁM SÁT THI</span>
            <i className='zmdi zmdi-more' />
          </li>
        </ul>
      )}
      {user.role == 'student' && (
        <ul className='nav navbar-nav side-nav nicescroll-bar'>
          <li className='navigation-header'>
            <span>Định danh</span>
            <i className='zmdi zmdi-more' />
          </li>

          <li>
            <a
              href='javascript:void(0);'
              data-toggle='collapse'
              data-target='#table_dr'
              className='active'
            >
              <div className='pull-left'>
                <i className='zmdi zmdi-search mr-20' />
                <span className='right-nav-text'>Phòng thi</span>
              </div>

              <div className='clearfix' />
            </a>
          </li>
          <li>
            <a
              href='/verify/data'
              data-toggle='collapse'
              data-target='#table_dr'
            >
              <div className='pull-left'>
                <i className='zmdi zmdi-face mr-20' />
                <span className='right-nav-text'>Dữ liệu định danh</span>
              </div>

              <div className='clearfix' />
            </a>
          </li>

          <li>
            <hr className='light-grey-hr mb-10' />
          </li>
          <li className='navigation-header'>
            <span>THÔNG TIN CHUNG</span>
            <i className='zmdi zmdi-more' />
          </li>
          <li>
            <a
              href='/profile'
              data-toggle='collapse'
              data-target='#table_profile'
            >
              <div className='pull-left'>
                <i className='zmdi zmdi-account mr-20' />
                <span className='right-nav-text'>Thông tin sinh viên</span>
              </div>

              <div className='clearfix' />
            </a>
          </li>
        </ul>
      )}
    </div>
  )
}

export default LeftSideBar
