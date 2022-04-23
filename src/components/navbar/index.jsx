import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userLogout } from '../../actions/auth'
import { logOut } from '../../helper/utils'

function NavBar() {
  const dispatch = useDispatch()
  function handleLogout() {
    const action = userLogout();
    dispatch(action);
    logOut();
  }
  // const user = useSelector((state) => state.auth.currentUser);

  return (
    <nav className='navbar navbar-inverse navbar-fixed-top'>
      <div className='mobile-only-brand pull-left'>
        <div className='nav-header pull-left'>
          <div className='logo-wrap'>
            <a href='index.html'>
              <img className='brand-img' src='img/logo.png' alt='brand' />
              <span className='brand-text'>Protoring Zoom</span>
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
              placeholder='Tìm kiếm'
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
          <li>
            <a id='open_right_sidebar' href='/'>
              <i className='zmdi zmdi-settings top-nav-icon' />
            </a>
          </li>
          <li className='dropdown app-drp'>
            <a href='/' className='dropdown-toggle' data-toggle='dropdown'>
              <i className='zmdi zmdi-apps top-nav-icon' />
            </a>
            <ul
              className='dropdown-menu app-dropdown'
              data-dropdown-in='slideInRight'
              data-dropdown-out='flipOutX'
            >
              <li>
                <div className='app-nicescroll-bar'>
                  <ul className='app-icon-wrap pa-10'>
                    <li>
                      <a href='weather.html' className='connection-item'>
                        <i className='zmdi zmdi-cloud-outline txt-info' />
                        <span className='block'>weather</span>
                      </a>
                    </li>
                    <li>
                      <a href='inbox.html' className='connection-item'>
                        <i className='zmdi zmdi-email-open txt-success' />
                        <span className='block'>e-mail</span>
                      </a>
                    </li>
                    <li>
                      <a href='calendar.html' className='connection-item'>
                        <i className='zmdi zmdi-calendar-check txt-primary' />
                        <span className='block'>calendar</span>
                      </a>
                    </li>
                    <li>
                      <a href='vector-map.html' className='connection-item'>
                        <i className='zmdi zmdi-map txt-danger' />
                        <span className='block'>map</span>
                      </a>
                    </li>
                    <li>
                      <a href='chats.html' className='connection-item'>
                        <i className='zmdi zmdi-comment-outline txt-warning' />
                        <span className='block'>chat</span>
                      </a>
                    </li>
                    <li>
                      <a href='contact-card.html' className='connection-item'>
                        <i className='zmdi zmdi-assignment-account' />
                        <span className='block'>contact</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <div className='app-box-bottom-wrap'>
                  <hr className='light-grey-hr ma-0' />
                  <a className='block text-center read-all' href='/'>
                    {' '}
                    more{' '}
                  </a>
                </div>
              </li>
            </ul>
          </li>
          <li className='dropdown full-width-drp'>
            <a href='/' className='dropdown-toggle' data-toggle='dropdown'>
              <i className='zmdi zmdi-more-vert top-nav-icon' />
            </a>
            <ul
              className='dropdown-menu mega-menu pa-0'
              data-dropdown-in='fadeIn'
              data-dropdown-out='fadeOut'
            >
              <li className='product-nicescroll-bar row'>
                <ul className='pa-20'>
                  <li className='col-md-3 col-xs-6 col-menu-list'>
                    <a href='/'>
                      <div className='pull-left'>
                        <i className='zmdi zmdi-landscape mr-20' />
                        <span className='right-nav-text'>Dashboard</span>
                      </div>
                      <div className='pull-right'>
                        <i className='zmdi zmdi-caret-down' />
                      </div>
                      <div className='clearfix' />
                    </a>
                    <hr className='light-grey-hr ma-0' />
                    <ul>
                      <li>
                        <a href='index.html'>Analytical</a>
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
                  </li>
                  <li className='col-md-3 col-xs-6 col-menu-list'>
                    <a href='/'>
                      <div className='pull-left'>
                        <i className='zmdi zmdi-shopping-basket mr-20' />
                        <span className='right-nav-text'>E-Commerce</span>
                      </div>
                      <div className='pull-right'>
                        <span className='label label-success'>hot</span>
                      </div>
                      <div className='clearfix' />
                    </a>
                    <hr className='light-grey-hr ma-0' />
                    <ul>
                      <li>
                        <a href='e-commerce.html'>Dashboard</a>
                      </li>
                      <li>
                        <a href='product.html'>Products</a>
                      </li>
                      <li>
                        <a href='product-detail.html'>Product Detail</a>
                      </li>
                      <li>
                        <a href='add-products.html'>Add Product</a>
                      </li>
                      <li>
                        <a href='product-orders.html'>Orders</a>
                      </li>
                      <li>
                        <a href='product-cart.html'>Cart</a>
                      </li>
                      <li>
                        <a href='product-checkout.html'>Checkout</a>
                      </li>
                    </ul>
                  </li>
                  <li className='col-md-6 col-xs-12 preview-carousel'>
                    <a href='/'>
                      <div className='pull-left'>
                        <span className='right-nav-text'>latest products</span>
                      </div>
                      <div className='clearfix' />
                    </a>
                    <hr className='light-grey-hr ma-0' />
                    <div className='product-carousel owl-carousel owl-theme text-center'>
                      <a href='/'>
                        <img src='img/chair.jpg' alt='chair' />
                        <span>Circle chair</span>
                      </a>
                      <a href='/'>
                        <img src='img/chair2.jpg' alt='chair' />
                        <span>square chair</span>
                      </a>
                      <a href='/'>
                        <img src='img/chair3.jpg' alt='chair' />
                        <span>semi circle chair</span>
                      </a>
                      <a href='/'>
                        <img src='img/chair4.jpg' alt='chair' />
                        <span>wooden chair</span>
                      </a>
                      <a href='/'>
                        <img src='img/chair2.jpg' alt='chair' />
                        <span>square chair</span>
                      </a>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className='dropdown alert-drp'>
            <a href='/' className='dropdown-toggle' data-toggle='dropdown'>
              <i className='zmdi zmdi-notifications top-nav-icon' />
              <span className='top-nav-icon-badge'>5</span>
            </a>
            <ul
              className='dropdown-menu alert-dropdown'
              data-dropdown-in='bounceIn'
              data-dropdown-out='bounceOut'
            >
              <li>
                <div className='notification-box-head-wrap'>
                  <span className='notification-box-head pull-left inline-block'>
                    notifications
                  </span>
                  <a
                    className='txt-danger pull-right clear-notifications inline-block'
                    href='/'
                  >
                    {' '}
                    clear all{' '}
                  </a>
                  <div className='clearfix' />
                  <hr className='light-grey-hr ma-0' />
                </div>
              </li>
              <li>
                <div className='streamline message-nicescroll-bar'>
                  <div className='sl-item'>
                    <a href='/'>
                      <div className='icon bg-green'>
                        <i className='zmdi zmdi-flag' />
                      </div>
                      <div className='sl-content'>
                        <span className='inline-block capitalize-font  pull-left truncate head-notifications'>
                          New subscription created
                        </span>
                        <span className='inline-block font-11  pull-right notifications-time'>
                          2pm
                        </span>
                        <div className='clearfix' />
                        <p className='truncate'>
                          Your customer subscribed for the basic plan. The
                          customer will pay $25 per month.
                        </p>
                      </div>
                    </a>
                  </div>
                  <hr className='light-grey-hr ma-0' />
                  <div className='sl-item'>
                    <a href='/'>
                      <div className='icon bg-yellow'>
                        <i className='zmdi zmdi-trending-down' />
                      </div>
                      <div className='sl-content'>
                        <span className='inline-block capitalize-font  pull-left truncate head-notifications txt-warning'>
                          Server #2 not responding
                        </span>
                        <span className='inline-block font-11 pull-right notifications-time'>
                          1pm
                        </span>
                        <div className='clearfix' />
                        <p className='truncate'>
                          Some technical error occurred needs to be resolved.
                        </p>
                      </div>
                    </a>
                  </div>
                  <hr className='light-grey-hr ma-0' />
                  <div className='sl-item'>
                    <a href='/'>
                      <div className='icon bg-blue'>
                        <i className='zmdi zmdi-email' />
                      </div>
                      <div className='sl-content'>
                        <span className='inline-block capitalize-font  pull-left truncate head-notifications'>
                          2 new messages
                        </span>
                        <span className='inline-block font-11  pull-right notifications-time'>
                          4pm
                        </span>
                        <div className='clearfix' />
                        <p className='truncate'>
                          {' '}
                          The last payment for your G Suite Basic subscription
                          failed.
                        </p>
                      </div>
                    </a>
                  </div>
                  <hr className='light-grey-hr ma-0' />
                  <div className='sl-item'>
                    <a href='/'>
                      <div className='sl-avatar'>
                        <img
                          className='img-responsive'
                          src='img/avatar.jpg'
                          alt='avatar'
                        />
                      </div>
                      <div className='sl-content'>
                        <span className='inline-block capitalize-font  pull-left truncate head-notifications'>
                          Sandy Doe
                        </span>
                        <span className='inline-block font-11  pull-right notifications-time'>
                          1pm
                        </span>
                        <div className='clearfix' />
                        <p className='truncate'>
                          Neque porro quisquam est qui dolorem ipsum quia dolor
                          sit amet, consectetur, adipisci velit
                        </p>
                      </div>
                    </a>
                  </div>
                  <hr className='light-grey-hr ma-0' />
                  <div className='sl-item'>
                    <a href='/'>
                      <div className='icon bg-red'>
                        <i className='zmdi zmdi-storage' />
                      </div>
                      <div className='sl-content'>
                        <span className='inline-block capitalize-font  pull-left truncate head-notifications txt-danger'>
                          99% server space occupied.
                        </span>
                        <span className='inline-block font-11  pull-right notifications-time'>
                          1pm
                        </span>
                        <div className='clearfix' />
                        <p className='truncate'>consectetur, adipisci velit.</p>
                      </div>
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className='notification-box-bottom-wrap'>
                  <hr className='light-grey-hr ma-0' />
                  <a className='block text-center read-all' href='/'>
                    {' '}
                    read all{' '}
                  </a>
                  <div className='clearfix' />
                </div>
              </li>
            </ul>
          </li>
          <li className='dropdown auth-drp'>
            <a href='/' className='dropdown-toggle pr-0' data-toggle='dropdown'>
              <img
                src='img/user1.jpg'
                alt='user_auth'
                className='user-auth-img img-circle'
              />
              <span className='user-online-status' />
            </a>
            <ul
              className='dropdown-menu user-auth-dropdown'
              data-dropdown-in='flipInX'
              data-dropdown-out='flipOutX'
            >
              <li>
                <a href='profile.html'>
                  <i className='zmdi zmdi-account' />
                  <span>Profile</span>
                </a>
              </li>
              <li>
                <a href='/'>
                  <i className='zmdi zmdi-card' />
                  <span>my balance</span>
                </a>
              </li>
              <li>
                <a href='inbox.html'>
                  <i className='zmdi zmdi-email' />
                  <span>Inbox</span>
                </a>
              </li>
              <li>
                <a href='/'>
                  <i className='zmdi zmdi-settings' />
                  <span>Settings</span>
                </a>
              </li>
              <li className='divider' />
              <li className='sub-menu show-on-hover'>
                <a href='/' className='dropdown-toggle pr-0 level-2-drp'>
                  <i className='zmdi zmdi-check text-success' /> available
                </a>
                <ul className='dropdown-menu open-left-side'>
                  <li>
                    <a href='/'>
                      <i className='zmdi zmdi-check text-success' />
                      <span>available</span>
                    </a>
                  </li>
                  <li>
                    <a href='/'>
                      <i className='zmdi zmdi-circle-o text-warning' />
                      <span>busy</span>
                    </a>
                  </li>
                  <li>
                    <a href='/'>
                      <i className='zmdi zmdi-minus-circle-outline text-danger' />
                      <span>offline</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li className='divider' />
              <li>
                <a href='/signin' onClick={handleLogout}>
                  <i className='zmdi zmdi-power' />
                  <span>Log Out</span>
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
