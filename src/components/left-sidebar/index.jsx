import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
function LeftSideBar() {
  const user = useSelector((state) => state.auth.currentUser)

  return (
    <div className='fixed-sidebar-left'>
      {user.role !== 'student' && (
        <ul className='nav navbar-nav side-nav nicescroll-bar'>
          <li className='navigation-header'>
            <span>General</span>
            <i className='zmdi zmdi-more' />
          </li>
          <li>
            <NavLink to='/student' activeClassName='active'>
              <div className='pull-left'>
                <i className='fa fa-graduation-cap mr-20' />
                <span className='right-nav-text'>Students</span>
              </div>
              <div className='clearfix' />
            </NavLink>
          </li>
          <li>
            <NavLink to='/room' activeClassName='active'>
              <div className='pull-left'>
                <i className='fa fa-th-large mr-20' />
                <span className='right-nav-text'>Rooms</span>
              </div>
              <div className='clearfix' />
            </NavLink>
          </li>
          <li>
            <NavLink to='/proctor' activeClassName='active'>
              <div className='pull-left'>
                <i className='fa fa-users mr-20' />
                <span className='right-nav-text'>Proctors</span>
              </div>
              <div className='clearfix' />
            </NavLink>
          </li>

          <li>
            <NavLink to='/subject' activeClassName='active'>
              <div className='pull-left'>
                <i className='fa fa-book mr-20' />
                <span className='right-nav-text'>Subjects</span>
              </div>
              <div className='clearfix' />
            </NavLink>
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
            <span>Identity</span>
            <i className='zmdi zmdi-more' />
          </li>

          <li>
            <NavLink to='/room' activeClassName='active'>
              <div className='pull-left'>
                <i className='fa fa-th-large mr-20' />
                <span className='right-nav-text'>Rooms</span>
              </div>
              <div className='clearfix' />
            </NavLink>
          </li>
          <li>
            <NavLink to='/verify/data' activeClassName='active'>
              <div className='pull-left'>
                <i className='zmdi zmdi-face mr-20' />
                <span className='right-nav-text'>Recognition data</span>
              </div>
              <div className='clearfix' />
            </NavLink>
          </li>

          <li>
            <hr className='light-grey-hr mb-10' />
          </li>
          <li className='navigation-header'>
            <span>General</span>
            <i className='zmdi zmdi-more' />
          </li>
          <li>
            <NavLink to='/profile' activeClassName='active'>
              <div className='pull-left'>
                <i className='zmdi zmdi-account mr-20' />
                <span className='right-nav-text'>Profile</span>
              </div>
              <div className='clearfix' />
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  )
}

export default LeftSideBar
