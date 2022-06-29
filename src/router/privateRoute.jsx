import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { isEmbedded } from '../helper/utils'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const logIn = useSelector((state) => state.auth.isLoggedIn)
  return (
    <Route
      {...rest}
      render={(props) =>
        logIn ? <Component {...rest} {...props} /> : <Redirect to={`/home`} />
      }
    />
  )
}

export default PrivateRoute
