/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { userLoginSuccess } from '../../actions/auth'
import { Redirect, useLocation } from 'react-router-dom'
import Spinner from '../../components/spinner/dotted'
import { useDispatch } from 'react-redux'

function SessionVerify() {
  const { search } = useLocation()
  const urlParams = new URLSearchParams(search)
  const page = urlParams.get('page')
  const session = urlParams.get('session')
  const roomId = urlParams.get('roomId')
  const [redirect, setRedirect] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL
    if (session)
      axios
        .post(`${API_URL}/auth/session`, null, {
          headers: {
            Authorization: `Bearer ${session}`
          }
        })
        .then((res) => {
          const { access_token, user } = res.data
          localStorage.setItem('user', JSON.stringify(user))
          localStorage.setItem('token', JSON.stringify(access_token))
          const action = userLoginSuccess(user)
          dispatch(action)
          setRedirect(true)
        })
        .catch((err) => {
          console.log(err)
        })
  }, [urlParams])
  if (redirect) {
    if (page === 'recognition_face') return <Redirect to='/verify/data' />
    else if (page === 'check-in' && roomId)
      return <Redirect to={`/room/${roomId}/verify/s1`} />
  }
  return <Spinner loading text={'Verifying...'} />
}

export default SessionVerify
