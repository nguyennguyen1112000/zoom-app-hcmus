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
              <i className='zmdi zmdi-account mr-20' />
              <span className='right-nav-text'>E-Commerce</span>
            </div>
            <div className='pull-right'>
              <span className='label label-success'>hot</span>
            </div>
            <div className='clearfix' />
          </a>
          <ul id='ecom_dr' className='collapse collapse-level-1'>
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
        <li>
          <a
            href='javascript:void(0);'
            data-toggle='collapse'
            data-target='#app_dr'
          >
            <div className='pull-left'>
              <i className='zmdi zmdi-apps mr-20' />
              <span className='right-nav-text'>Apps </span>
            </div>
            <div className='pull-right'>
              <i className='zmdi zmdi-caret-down' />
            </div>
            <div className='clearfix' />
          </a>
          <ul id='app_dr' className='collapse collapse-level-1'>
            <li>
              <a href='chats.html'>chats</a>
            </li>
            <li>
              <a href='calendar.html'>calendar</a>
            </li>
            <li>
              <a href='weather.html'>weather</a>
            </li>
            <li>
              <a
                href='javascript:void(0);'
                data-toggle='collapse'
                data-target='#email_dr'
              >
                Email
                <div className='pull-right'>
                  <i className='zmdi zmdi-caret-down' />
                </div>
                <div className='clearfix' />
              </a>
              <ul id='email_dr' className='collapse collapse-level-2'>
                <li>
                  <a href='inbox.html'>inbox</a>
                </li>
                <li>
                  <a href='inbox-detail.html'>detail email</a>
                </li>
              </ul>
            </li>
            <li>
              <a
                href='javascript:void(0);'
                data-toggle='collapse'
                data-target='#contact_dr'
              >
                Contacts
                <div className='pull-right'>
                  <i className='zmdi zmdi-caret-down' />
                </div>
                <div className='clearfix' />
              </a>
              <ul id='contact_dr' className='collapse collapse-level-2'>
                <li>
                  <a href='contact-list.html'>list</a>
                </li>
                <li>
                  <a href='contact-card.html'>cards</a>
                </li>
              </ul>
            </li>
            <li>
              <a href='file-manager.html'>File Manager</a>
            </li>
            <li>
              <a href='todo-tasklist.html'>To Do/Tasklist</a>
            </li>
          </ul>
        </li>
        <li>
          <a href='widgets.html'>
            <div className='pull-left'>
              <i className='zmdi zmdi-flag mr-20' />
              <span className='right-nav-text'>widgets</span>
            </div>
            <div className='pull-right'>
              <span className='label label-warning'>8</span>
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
            data-target='#ui_dr'
          >
            <div className='pull-left'>
              <i className='zmdi zmdi-smartphone-setup mr-20' />
              <span className='right-nav-text'>UI Elements</span>
            </div>
            <div className='pull-right'>
              <i className='zmdi zmdi-caret-down' />
            </div>
            <div className='clearfix' />
          </a>
          <ul id='ui_dr' className='collapse collapse-level-1 two-col-list'>
            <li>
              <a href='panels-wells.html'>Panels &amp; Wells</a>
            </li>
            <li>
              <a href='modals.html'>Modals</a>
            </li>
            <li>
              <a href='sweetalert.html'>Sweet Alerts</a>
            </li>
            <li>
              <a href='notifications.html'>notifications</a>
            </li>
            <li>
              <a href='typography.html'>Typography</a>
            </li>
            <li>
              <a href='buttons.html'>Buttons</a>
            </li>
            <li>
              <a href='accordion-toggle.html'>Accordion / Toggles</a>
            </li>
            <li>
              <a href='tabs.html'>Tabs</a>
            </li>
            <li>
              <a href='progressbars.html'>Progress bars</a>
            </li>
            <li>
              <a href='skills-counter.html'>Skills &amp; Counters</a>
            </li>
            <li>
              <a href='pricing.html'>Pricing Tables</a>
            </li>
            <li>
              <a href='nestable.html'>Nestables</a>
            </li>
            <li>
              <a href='dorpdown.html'>Dropdowns</a>
            </li>
            <li>
              <a href='bootstrap-treeview.html'>Tree View</a>
            </li>
            <li>
              <a href='carousel.html'>Carousel</a>
            </li>
            <li>
              <a href='range-slider.html'>Range Slider</a>
            </li>
            <li>
              <a href='grid-styles.html'>Grid</a>
            </li>
            <li>
              <a href='bootstrap-ui.html'>Bootstrap UI</a>
            </li>
          </ul>
        </li>
        <li>
          <a
            href='javascript:void(0);'
            data-toggle='collapse'
            data-target='#form_dr'
          >
            <div className='pull-left'>
              <i className='zmdi zmdi-edit mr-20' />
              <span className='right-nav-text'>Forms</span>
            </div>
            <div className='pull-right'>
              <i className='zmdi zmdi-caret-down' />
            </div>
            <div className='clearfix' />
          </a>
          <ul id='form_dr' className='collapse collapse-level-1 two-col-list'>
            <li>
              <a href='form-element.html'>Basic Forms</a>
            </li>
            <li>
              <a href='form-layout.html'>form Layout</a>
            </li>
            <li>
              <a href='form-advanced.html'>Form Advanced</a>
            </li>
            <li>
              <a href='form-mask.html'>Form Mask</a>
            </li>
            <li>
              <a href='form-picker.html'>Form Picker</a>
            </li>
            <li>
              <a href='form-validation.html'>form Validation</a>
            </li>
            <li>
              <a href='form-wizard.html'>Form Wizard</a>
            </li>
            <li>
              <a href='form-x-editable.html'>X-Editable</a>
            </li>
            <li>
              <a href='cropperjs.html'>Cropperjs</a>
            </li>
            <li>
              <a href='form-file-upload.html'>File Upload</a>
            </li>
            <li>
              <a href='dropzone.html'>Dropzone</a>
            </li>
            <li>
              <a href='bootstrap-wysihtml5.html'>Bootstrap Wysihtml5</a>
            </li>
            <li>
              <a href='tinymce-wysihtml5.html'>Tinymce Wysihtml5</a>
            </li>
            <li>
              <a href='summernote-wysihtml5.html'>summernote</a>
            </li>
            <li>
              <a href='typeahead-js.html'>typeahead</a>
            </li>
          </ul>
        </li>
        <li>
          <a
            href='javascript:void(0);'
            data-toggle='collapse'
            data-target='#chart_dr'
          >
            <div className='pull-left'>
              <i className='zmdi zmdi-chart-donut mr-20' />
              <span className='right-nav-text'>Charts </span>
            </div>
            <div className='pull-right'>
              <i className='zmdi zmdi-caret-down' />
            </div>
            <div className='clearfix' />
          </a>
          <ul id='chart_dr' className='collapse collapse-level-1 two-col-list'>
            <li>
              <a href='flot-chart.html'>Flot Chart</a>
            </li>
            <li>
              <a href='morris-chart.html'>Morris Chart</a>
            </li>
            <li>
              <a href='chart.js.html'>chartjs</a>
            </li>
            <li>
              <a href='chartist.html'>chartist</a>
            </li>
            <li>
              <a href='easy-pie-chart.html'>Easy Pie Chart</a>
            </li>
            <li>
              <a href='sparkline.html'>Sparkline</a>
            </li>
            <li>
              <a href='peity-chart.html'>Peity Chart</a>
            </li>
          </ul>
        </li>
        <li>
          <a
            href='javascript:void(0);'
            data-toggle='collapse'
            data-target='#table_dr'
          >
            <div className='pull-left'>
              <i className='zmdi zmdi-format-size mr-20' />
              <span className='right-nav-text'>Tables</span>
            </div>
            <div className='pull-right'>
              <i className='zmdi zmdi-caret-down' />
            </div>
            <div className='clearfix' />
          </a>
          <ul id='table_dr' className='collapse collapse-level-1 two-col-list'>
            <li>
              <a href='basic-table.html'>Basic Table</a>
            </li>
            <li>
              <a href='bootstrap-table.html'>Bootstrap Table</a>
            </li>
            <li>
              <a href='data-table.html'>Data Table</a>
            </li>
            <li>
              <a href='export-table.html'>
                <span className='pull-right'>
                  <span className='label label-success'>New</span>
                </span>
                Export Table
              </a>
            </li>
            <li>
              <a href='responsive-data-table.html'>
                <span className='pull-right'>
                  <span className='label label-success'>New</span>
                </span>
                RSPV DataTable
              </a>
            </li>
            <li>
              <a href='responsive-table.html'>Responsive Table</a>
            </li>
            <li>
              <a href='editable-table.html'>Editable Table</a>
            </li>
            <li>
              <a href='foo-table.html'>Foo Table</a>
            </li>
            <li>
              <a href='jsgrid-table.html'>Jsgrid Table</a>
            </li>
          </ul>
        </li>
        <li>
          <a
            href='javascript:void(0);'
            data-toggle='collapse'
            data-target='#icon_dr'
          >
            <div className='pull-left'>
              <i className='zmdi zmdi-iridescent mr-20' />
              <span className='right-nav-text'>Icons</span>
            </div>
            <div className='pull-right'>
              <i className='zmdi zmdi-caret-down' />
            </div>
            <div className='clearfix' />
          </a>
          <ul id='icon_dr' className='collapse collapse-level-1'>
            <li>
              <a href='fontawesome.html'>Fontawesome</a>
            </li>
            <li>
              <a href='themify.html'>Themify</a>
            </li>
            <li>
              <a href='linea-icon.html'>Linea</a>
            </li>
            <li>
              <a href='simple-line-icons.html'>Simple Line</a>
            </li>
            <li>
              <a href='pe-icon-7.html'>Pe-icon-7</a>
            </li>
            <li>
              <a href='glyphicons.html'>Glyphicons</a>
            </li>
          </ul>
        </li>
        <li>
          <a
            href='javascript:void(0);'
            data-toggle='collapse'
            data-target='#maps_dr'
          >
            <div className='pull-left'>
              <i className='zmdi zmdi-map mr-20' />
              <span className='right-nav-text'>maps</span>
            </div>
            <div className='pull-right'>
              <i className='zmdi zmdi-caret-down' />
            </div>
            <div className='clearfix' />
          </a>
          <ul id='maps_dr' className='collapse collapse-level-1'>
            <li>
              <a href='vector-map.html'>Vector Map</a>
            </li>
            <li>
              <a href='google-map.html'>Google Map</a>
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
        <li>
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
        </li>
      </ul>
    </div>
  )
}

export default LeftSideBar
