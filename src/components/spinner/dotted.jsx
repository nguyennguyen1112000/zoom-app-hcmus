import React from 'react'
import PropTypes from 'prop-types'
import { SpinnerDotted } from 'spinners-react'
Spinner.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string
}

function Spinner({ loading, text }) {
  return (
    <div className='spinner-loading'>
      <SpinnerDotted
        size={50}
        thickness={150}
        color='#2986CC'
        enabled={loading}
      />
      {loading && text}
    </div>
  )
}

export default Spinner
