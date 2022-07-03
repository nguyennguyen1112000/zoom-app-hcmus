import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userLogout } from '../../actions/auth'
import { getShortName, logOut } from '../../helper/utils'

function NavBar() {
  const dispatch = useDispatch()
  function handleLogout() {
    const action = userLogout()
    logOut()
    dispatch(action)
  }
  const user = useSelector((state) => state.auth.currentUser)

  return (
    <nav className='navbar navbar-inverse navbar-fixed-top'>
      <div className='mobile-only-brand pull-left'>
        <div className='nav-header pull-left'>
          <div className='logo-wrap'>
            <a href='/room'>
              <img className='brand-img' src='/img/logo.png' alt='brand' />
              <span className='brand-text'>HCMUSID</span>
            </a>
          </div>
        </div>
        <a
          id='toggle_nav_btn'
          className='toggle-left-nav-btn inline-block ml-20 pull-left'
          href='/'
        >
          <i className='zmdi zmdi-menu' />
        </a>
        <a
          id='toggle_mobile_search'
          data-toggle='collapse'
          data-target='#search_form'
          className='mobile-only-view'
          href='/'
        >
          <i className='zmdi zmdi-search' />
        </a>
        <a id='toggle_mobile_nav' className='mobile-only-view' href='/'>
          <i className='zmdi zmdi-more' />
        </a>
        <form
          id='search_form'
          role='search'
          className='top-nav-search collapse pull-left'
        >
          <div className='input-group'>
            <input
              type='text'
              name='example-input1-group2'
              className='form-control'
              placeholder='Search (student, room, subject) ...'
            />
            <span className='input-group-btn'>
              <button
                type='button'
                className='btn  btn-default'
                data-target='#search_form'
                data-toggle='collapse'
                aria-label='Close'
                aria-expanded='true'
              >
                <i className='zmdi zmdi-search' />
              </button>
            </span>
          </div>
        </form>
      </div>
      <div id='mobile_only_nav' className='mobile-only-nav pull-right'>
        <ul className='nav navbar-right top-nav pull-right'>
          <li className='dropdown auth-drp'>
            <a href='/' className='dropdown-toggle pr-0' data-toggle='dropdown'>
              <span
                className='user-auth-img'
                style={{ background: '#eb4034', padding: 5, color: 'white' }}
              >
                {user &&
                  user.role !== 'proctor' &&
                  getShortName(user?.firstName + user?.lastName)}
                {user &&
                  user.role === 'proctor' &&
                  user.staffCode}
              </span>
              <span className='user-online-status' />
            </a>
            <ul
              className='dropdown-menu user-auth-dropdown'
              data-dropdown-in='flipInX'
              data-dropdown-out='flipOutX'
            >
              {user?.role === 'admin' && (
                <>
                  <li>
                    <a href='/profile'>
                      <i className='zmdi zmdi-account' />
                      <span>Profile</span>
                    </a>
                  </li>
                  <li className='divider' />
                </>
              )}
              <li>
                <a href='/signin' onClick={handleLogout}>
                  <i className='zmdi zmdi-power' />
                  <span>Logout</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
