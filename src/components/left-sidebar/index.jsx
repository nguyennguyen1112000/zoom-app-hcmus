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
              <span className='right-nav-text'>Phòng Zoom</span>
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
            <li>
              <a href='index2.html'>Hướng dẫn</a>
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
        {/* <li>
          <a
            className='active'
            href='javascript:void(0);'
            data-toggle='collapse'
            data-target='#dashboard_dr'
          >
            <div className='pull-left'>
              <i className='zmdi zmdi-landscape mr-20' />
              <span className='right-nav-text'>Dashboard</span>
            </div>
            <div className='pull-right'>
              <i className='zmdi zmdi-caret-down' />
            </div>
            <div className='clearfix' />
          </a>
          <ul id='dashboard_dr' className='collapse collapse-level-1'>
            <li>
              <a className='active-page' href='index.html'>
                Analytical
              </a>
            </li>
            <li>
              <a href='index2.html'>Demographic</a>
            </li>
            <li>
              <a href='index3.html'>Project</a>
            </li>
            <li>
              <a href='index4.html'>Hospital</a>
            </li>
            <li>
              <a href='index5.html'>HRM</a>
            </li>
            <li>
              <a href='index6.html'>Real Estate</a>
            </li>
            <li>
              <a href='profile.html'>profile</a>
            </li>
          </ul>
        </li> */}
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
            <div className='pull-right'>
              <span className='label label-success'>hot</span>
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
        {/* <li>
          <a
            href='javascript:void(0);'
            data-toggle='collapse'
            data-target='#pages_dr'
          >
            <div className='pull-left'>
              <i className='zmdi zmdi-google-pages mr-20' />
              <span className='right-nav-text'>Special Pages</span>
            </div>
            <div className='pull-right'>
              <i className='zmdi zmdi-caret-down' />
            </div>
            <div className='clearfix' />
          </a>
          <ul id='pages_dr' className='collapse collapse-level-1 two-col-list'>
            <li>
              <a href='blank.html'>Blank Page</a>
            </li>
            <li>
              <a
                href='javascript:void(0);'
                data-toggle='collapse'
                data-target='#auth_dr'
              >
                Authantication pages
                <div className='pull-right'>
                  <i className='zmdi zmdi-caret-down' />
                </div>
                <div className='clearfix' />
              </a>
              <ul id='auth_dr' className='collapse collapse-level-2'>
                <li>
                  <a href='login.html'>Login</a>
                </li>
                <li>
                  <a href='signup.html'>Register</a>
                </li>
                <li>
                  <a href='forgot-password.html'>Recover Password</a>
                </li>
                <li>
                  <a href='reset-password.html'>reset Password</a>
                </li>
                <li>
                  <a href='locked.html'>Lock Screen</a>
                </li>
              </ul>
            </li>
            <li>
              <a
                href='javascript:void(0);'
                data-toggle='collapse'
                data-target='#invoice_dr'
              >
                Invoice
                <div className='pull-right'>
                  <i className='zmdi zmdi-caret-down' />
                </div>
                <div className='clearfix' />
              </a>
              <ul id='invoice_dr' className='collapse collapse-level-2'>
                <li>
                  <a href='invoice.html'>Invoice</a>
                </li>
                <li>
                  <a href='invoice-archive.html'>Invoice Archive</a>
                </li>
              </ul>
            </li>
            <li>
              <a
                href='javascript:void(0);'
                data-toggle='collapse'
                data-target='#error_dr'
              >
                error pages
                <div className='pull-right'>
                  <i className='zmdi zmdi-caret-down' />
                </div>
                <div className='clearfix' />
              </a>
              <ul id='error_dr' className='collapse collapse-level-2'>
                <li>
                  <a href='404.html'>Error 404</a>
                </li>
                <li>
                  <a href='500.html'>Error 500</a>
                </li>
              </ul>
            </li>
            <li>
              <a href='gallery.html'>Gallery</a>
            </li>
            <li>
              <a href='timeline.html'>Timeline</a>
            </li>
            <li>
              <a href='faq.html'>FAQ</a>
            </li>
          </ul>
        </li>
        <li>
          <a href='documentation.html'>
            <div className='pull-left'>
              <i className='zmdi zmdi-book mr-20' />
              <span className='right-nav-text'>documentation</span>
            </div>
            <div className='clearfix' />
          </a>
        </li>
        <li>
          <a
            href='javascript:void(0);'
            data-toggle='collapse'
            data-target='#dropdown_dr_lv1'
          >
            <div className='pull-left'>
              <i className='zmdi zmdi-filter-list mr-20' />
              <span className='right-nav-text'>multilevel</span>
            </div>
            <div className='pull-right'>
              <i className='zmdi zmdi-caret-down' />
            </div>
            <div className='clearfix' />
          </a>
          <ul id='dropdown_dr_lv1' className='collapse collapse-level-1'>
            <li>
              <a href='#'>Item level 1</a>
            </li>
            <li>
              <a
                href='javascript:void(0);'
                data-toggle='collapse'
                data-target='#dropdown_dr_lv2'
              >
                Dropdown level 2
                <div className='pull-right'>
                  <i className='zmdi zmdi-caret-down' />
                </div>
                <div className='clearfix' />
              </a>
              <ul id='dropdown_dr_lv2' className='collapse collapse-level-2'>
                <li>
                  <a href='#'>Item level 2</a>
                </li>
                <li>
                  <a href='#'>Item level 2</a>
                </li>
              </ul>
            </li>
          </ul>
        </li> */}
      </ul>
    </div>
  )
}

export default LeftSideBar
