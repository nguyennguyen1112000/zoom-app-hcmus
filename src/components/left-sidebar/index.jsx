import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import { userLogout } from '../../actions/auth'
import { isEmbedded, logOut } from '../../helper/utils'
function LeftSideBar() {
  const embedded = isEmbedded()
  const user = useSelector((state) => state.auth.currentUser)
  const dispatch = useDispatch()
  const [redirect, setRedirect] = useState(false)
  function handleLogout() {
    const action = userLogout()
    logOut()
    dispatch(action)
    setRedirect(true)
  }
  console.log("1111",embedded)
  if (redirect)
    return isEmbedded() ? <Redirect to='/home' /> : <Redirect to='/signin' />
  return (
    <div className='fixed-sidebar-left'>
      {user.role === 'admin' && (
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
            <span>Identity</span>
            <i className='zmdi zmdi-more' />
          </li>

          <li>
            <NavLink to='/identity/settings' activeClassName='active'>
              <div className='pull-left'>
                <i className='fa fa-gear mr-20' />
                <span className='right-nav-text'>Configuration</span>
              </div>
              <div className='clearfix' />
            </NavLink>
          </li>
          <li>
            <NavLink to='/identity/sessions' activeClassName='active'>
              <div className='pull-left'>
                <i className='fa fa-calendar mr-20' />
                <span className='right-nav-text'>Sessions</span>
              </div>
              <div className='clearfix' />
            </NavLink>
          </li>
          <li>
            <NavLink to='/identity/sessions-room' activeClassName='active'>
              <div className='pull-left'>
                <i className='fa fa-calendar-check-o mr-20' />
                <span className='right-nav-text'>Room Session</span>
              </div>
              <div className='clearfix' />
            </NavLink>
          </li>

          <li>
            <hr className='light-grey-hr mb-10' />
          </li>

          {/* <li className='navigation-header'>
            <span>GIÁM SÁT THI</span>
            <i className='zmdi zmdi-more' />
          </li> */}
          <li>
            <a href='' onClick={handleLogout}>
              <div className='pull-left'>
                <i className='fa fa-sign-out mr-20' />
                <span className='right-nav-text'>Logout</span>
              </div>
              <div className='clearfix' />
            </a>
          </li>
        </ul>
      )}
      {user.role === 'proctor' && (
        <ul className='nav navbar-nav side-nav nicescroll-bar'>
          <li className='navigation-header'>
            <span>General</span>
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
            <hr className='light-grey-hr mb-10' />
          </li>
          <li className='navigation-header'>
            <span>Identity</span>
            <i className='zmdi zmdi-more' />
          </li>
          <li>
            <NavLink to='/identity/sessions' activeClassName='active'>
              <div className='pull-left'>
                <i className='fa fa-calendar mr-20' />
                <span className='right-nav-text'>Sessions</span>
              </div>
              <div className='clearfix' />
            </NavLink>
          </li>
          <li>
            <NavLink to='/identity/sessions-room' activeClassName='active'>
              <div className='pull-left'>
                <i className='fa fa-calendar-check-o mr-20' />
                <span className='right-nav-text'>Room Session</span>
              </div>
              <div className='clearfix' />
            </NavLink>
          </li>

          <li>
            <hr className='light-grey-hr mb-10' />
          </li>

          {/* <li className='navigation-header'>
            <span>GIÁM SÁT THI</span>
            <i className='zmdi zmdi-more' />
          </li> */}
          <li>
            <a href='' onClick={handleLogout}>
              <div className='pull-left'>
                <i className='fa fa-sign-out mr-20' />
                <span className='right-nav-text'>Logout</span>
              </div>
              <div className='clearfix' />
            </a>
          </li>
        </ul>
      )}
      {user.role === 'student' && (
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
          <li>
            <a href='' onClick={handleLogout}>
              <div className='pull-left'>
                <i className='fa fa-sign-out mr-20' />
                <span className='right-nav-text'>Logout</span>
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
