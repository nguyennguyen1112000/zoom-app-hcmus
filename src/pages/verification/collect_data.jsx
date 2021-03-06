/* eslint-disable no-undef */
import axios from 'axios'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { authHeader, isEmbedded } from '../../helper/utils'
import { WebcamFacePrivate } from '../webcam/WebcamFacePrivate'
import socketIOClient from 'socket.io-client'
const API_URL = process.env.REACT_APP_API_URL
function VerificationCollectData({ zoomSdk }) {
  const socketRef = useRef()
  const user = useSelector((state) => state.auth.currentUser)
  const [config, setConfig] = useState(null)
  const [reload, setReload] = useState(false)
  const embedded = isEmbedded()
  useEffect(() => {
    axios
      .get(`${API_URL}/configuration`, authHeader())
      .then((res) => {
        console.log('res.data', res.data)

        setConfig(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    socketRef.current = socketIOClient.connect(API_URL)

    socketRef.current.on('toClientCloseTerm', (data) => {
      setReload(!reload)
    })
  }, [reload])
  const openInBrowser = async () => {
    await zoomSdk.openUrl({
      url: `${
        process.env.REACT_APP_HOST_URL
      }/auth/verify?session=${JSON.parse(localStorage.getItem(
        'token')
      )}&page=recognition_face`
    })
  }
  return (
    <div className='container-fluid'>
      {/* Title */}
      <div className='row heading-bg'>
        <div className='col-lg-3 col-md-4 col-sm-4 col-xs-12'>
          <h5 className='txt-dark'>Face Data</h5>
        </div>
        {/* Breadcrumb */}
        <div className='col-lg-9 col-sm-8 col-md-8 col-xs-12'>
          <ol className='breadcrumb'>
            <li>
              <a href='index.html'>{user?.studentId}</a>
            </li>

            <li className='active'>
              <span>Collect face data</span>
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
            <div className='panel-heading'></div>
            <div className='panel-wrapper collapse in'>
              {embedded ? (
                <div className='panel-body text-center'>
                  <h6>
                    This function does not currently support Zoom Desktop
                    Platform
                  </h6>
                  <button
                    className='btn btn-primary mt-20'
                    onClick={openInBrowser}
                  >
                    Use in browser
                  </button>
                </div>
              ) : (
                <div className='panel-body'>
                  <div className='col-sm-12'>
                    {!config?.openCollectData && (
                      <div className='auth-form  ml-auto mr-auto no-float'>
                        <div className='row'>
                          <div className='col-sm-12 col-xs-12'>
                            <div className='mb-30'>
                              <span className='text-center nonecase-font mb-20 block error-comment'>
                                It's not time to collect data, please come back
                                later!
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {config?.openCollectData && (
                      <div className='row'>
                        <div className='col-md-3'>
                          <div className='panel panel-default card-view'>
                            <div className='panel-heading'>
                              <div className='pull-left'>
                                <h6 className='panel-title'>
                                  Center your face in the webcam
                                </h6>
                                <img
                                  src='/img/face_recognition_example.png'
                                  alt='face_recognition_example'
                                  width={270}
                                />
                                <h6 className='panel-title mt-10'>
                                  Please follow the instructions below
                                </h6>
                                <img
                                  src='/img/face_recognition_instruction.png'
                                  alt='face_recognition_instruction'
                                  width={270}
                                />
                              </div>
                              <div className='clearfix' />
                            </div>
                          </div>
                        </div>
                        <div className='col-md-9'>
                          <WebcamFacePrivate studentId={user?.studentId} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* /Row */}
    </div>
  )
}

export default VerificationCollectData
