import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getShortName } from '../../helper/utils'
//import { useHistory } from 'react-router-dom'
//import './css/style.css'
import { getRoom } from '../../services/api/room'
function RealtimeVerify() {
  const dispatch = useDispatch()
  //const history = useHistory()
  let { id } = useParams()
  useEffect(() => {
    if (id) dispatch(getRoom(id))
  }, [dispatch, id])
  const currentRoom = useSelector((state) => state.room.currentRoom)
  useEffect(() => {}, [])
  return (
    <div className='container-fluid'>
      {/* Title */}
      <div className='row heading-bg'>
        <div className='col-lg-3 col-md-4 col-sm-4 col-xs-12'>
          <h5 className='txt-dark'>Định danh trực tuyến</h5>
        </div>
        {/* Breadcrumb */}
        <div className='col-lg-9 col-sm-8 col-md-8 col-xs-12'>
          <ol className='breadcrumb'>
            <li>
              <a href='index.html'>HCMUSID</a>
            </li>
            <li>
              <a href='#'>
                <span>Giám sát định danh</span>
              </a>
            </li>
            <li className='active'>
              <span>Thi CK Lập trình hướng đối tượng P01</span>
            </li>
          </ol>
        </div>
        {/* /Breadcrumb */}
      </div>
      {/* /Title */}
      {/* Row */}
      <div className='row'>
        <div className='col-md-12'>
          <div className='panel panel-default border-panel card-view pa-0'>
            <div className='panel-wrapper collapse in'>
              <div className='panel-body pa-0'>
                <div className='chat-cmplt-wrap chat-for-widgets-1'>
                  <div className='chat-box-wrap'>
                    <div>
                      <form role='search' className='chat-search'>
                        <div className='input-group'>
                          <input
                            id='example-input1-group21'
                            name='example-input1-group2'
                            className='form-control'
                            placeholder='Tìm kiếm sinh viên'
                            type='text'
                          />
                          <span className='input-group-btn'>
                            <button type='button' className='btn  btn-default'>
                              <i className='zmdi zmdi-search' />
                            </button>
                          </span>
                        </div>
                      </form>
                      <div
                        className='chatapp-nicescroll-bar'
                        style={{
                          height: '543px',
                          'overflow-y': 'scroll'
                        }}
                      >
                        <ul className='chat-list-wrap'>
                          <li className='chat-list'>
                            <div className='chat-body'>
                              {currentRoom &&
                                currentRoom.students &&
                                currentRoom.students.map((student) => (
                                  <a href='javascript:void(0)'>
                                    <div className='chat-data'>
                                      <div
                                        className='user-img img-background'
                                        style={{
                                          background: [
                                            '#dfa600',
                                            '#be2000',
                                            '#42f400',
                                            '#42b8fc'
                                          ][Math.floor(Math.random() * 4)]
                                        }}
                                      >
                                        {' '}
                                        {getShortName(
                                          student.firstName +
                                            ' ' +
                                            student.lastName
                                        )}
                                      </div>
                                      <div className='user-data'>
                                        <span className='name block capitalize-font'>
                                          {student.studentId}
                                        </span>
                                        <span className='time block truncate txt-grey'>
                                          {student.firstName +
                                            ' ' +
                                            student.lastName}
                                        </span>
                                      </div>
                                      <div className='status away' />
                                      <div className='clearfix' />
                                    </div>
                                  </a>
                                ))}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className='recent-chat-box-wrap'>
                    <div className='recent-chat-wrap'>
                      <div className='panel-heading ma-0 pt-15'>
                        <div className='goto-back'>
                          <a
                            id='goto_back_widget_1'
                            href='javascript:void(0)'
                            className='inline-block txt-grey'
                          >
                            <i className='zmdi zmdi-account-add' />
                          </a>
                          <span className='inline-block txt-dark'>
                            CHAT BOX
                          </span>
                          <a
                            href='javascript:void(0)'
                            className='inline-block text-right txt-grey'
                          >
                            <i className='zmdi zmdi-more' />
                          </a>
                          <div className='clearfix' />
                        </div>
                      </div>
                      <div className='panel-wrapper collapse in'>
                        <div className='panel-body pa-0'>
                          <div className='chat-content'>
                            <ul className='chatapp-chat-nicescroll-bar pt-20'>
                              <li className='friend'>
                                <div className='friend-msg-wrap'>
                                  <img
                                    className='user-img img-circle block pull-left'
                                    src='/img/robot.png'
                                    alt='user'
                                  />
                                  <div className='msg pull-left'>
                                    <p>
                                      <i>18120486</i> Nguyễn Bình Nguyên đã định
                                      danh <b>thành công</b>
                                    </p>
                                    <div className='msg-per-detail text-right'>
                                      <span className='msg-time txt-grey'>
                                        07:30
                                      </span>
                                    </div>
                                  </div>
                                  <div className='clearfix' />
                                </div>
                              </li>
                              <li className='friend'>
                                <div className='friend-msg-wrap'>
                                  <img
                                    className='user-img img-circle block pull-left'
                                    src='/img/robot.png'
                                    alt='user'
                                  />
                                  <div className='msg pull-left'>
                                    <p>
                                      <i>18120585</i> Triệu Mai Ngọc Thức đã
                                      định danh <b>thành công</b>
                                    </p>
                                    <div className='msg-per-detail text-right'>
                                      <span className='msg-time txt-grey'>
                                        07:35
                                      </span>
                                    </div>
                                  </div>
                                  <div className='clearfix' />
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Row */}
      {/* Row */}
    </div>
  )
}

export default RealtimeVerify
