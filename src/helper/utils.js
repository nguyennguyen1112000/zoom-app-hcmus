import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL
export function authHeader() {
  const token = JSON.parse(localStorage.getItem('token'))
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}
export function isEmbedded() {
  return localStorage.getItem('isEmbedded') ? true : false
}
export function getClient() {
  return JSON.parse(localStorage.getItem('client'))
}

export function getVerifiedInfo() {
  return JSON.parse(localStorage.getItem('verifiedInfo'))
}
export function logOut() {
  localStorage.setItem('user', null)
  localStorage.setItem('token', null)
}

export function handleExpiredToken(error, swal) {
  if (
    error.response?.data?.message === 'Invalid access token' &&
    error.response?.data?.statusCode === 401
  ) {
    swal({
      title: 'Zoom session expired',
      text: 'Please sigin again to continue!',
      icon: 'warning',
      //buttons: true,
      dangerMode: true,
      button: 'Sign in again'
    }).then((willLoginAgain) => {
      if (willLoginAgain) {
        axios
          .post(
            `${API_URL}/zooms/refresh_token`,
            { isEmbedded: isEmbedded() },
            authHeader()
          )
          .then((res) => {
            localStorage.setItem('token', `"${res.data}"`)
            swal('Login successfully', {
              icon: 'success'
            })
          })
          .catch((err) => {
            console.log(err.response)
          })
      }
    })
  }
}
export function formatDate(date) {
  return `${('0' + date.getDate()).slice(-2)}/${(
    '0' +
    (date.getMonth() + 1)
  ).slice(-2)}/${('0' + date.getFullYear()).slice(-4)}`
}
export function formatTime(date) {
  const time = `${('0' + date.getHours()).slice(-2)}:${(
    '0' + date.getMinutes()
  ).slice(-2)}`

  return `${tConv24(time)} ${('0' + date.getDate()).slice(-2)}/${(
    '0' +
    (date.getMonth() + 1)
  ).slice(-2)}/${date.getFullYear()} `
}
export function formatTimeWithoutDate(date) {
  const time = `${('0' + date.getHours()).slice(-2)}:${(
    '0' + date.getMinutes()
  ).slice(-2)}`
  return tConv24(time)
}
export const findDaysDifferent = (fromDate) => {
  let CreatedDate = new Date(fromDate)
  let today = new Date()
  let requiredDiffrentDays

  const oneDay = 24 * 60 * 60 * 1000
  const diffDays = Math.round(Math.abs((CreatedDate - today) / oneDay))

  if (diffDays >= 360) {
    requiredDiffrentDays = `${Math.floor(diffDays / 365)} n??m tr?????c`
  } else if (diffDays >= 30) {
    requiredDiffrentDays = `${Math.floor(diffDays / 30)} th??ng tr?????c`
  } else if (diffDays >= 7) {
    requiredDiffrentDays = `${Math.floor(diffDays / 7)} tu???n tr?????c`
  } else if (diffDays >= 1) {
    requiredDiffrentDays = `${diffDays} ng??y tr?????c`
  } else {
    const oneHour = 60 * 60 * 1000
    const diffHours = Math.round(Math.abs((CreatedDate - today) / oneHour))
    if (diffHours == 0) {
      const oneMinute = 60 * 1000
      const diffMinutes = Math.round(
        Math.abs((CreatedDate - today) / oneMinute)
      )
      requiredDiffrentDays = `${diffMinutes} ph??t tr?????c`
    } else requiredDiffrentDays = `${diffHours} gi??? tr?????c`
  }

  return requiredDiffrentDays
}

export const getShortName = (name) => {
  const arrNames = name.split(' ')
  if (arrNames.length >= 2) {
    return (
      arrNames[arrNames.length - 2][0].toUpperCase() +
      arrNames[arrNames.length - 1][0].toUpperCase()
    )
  }
}

export function tConv24(time24) {
  var ts = time24
  var H = +ts.substr(0, 2)
  var h = H % 12 || 12
  h = h < 10 ? '0' + h : h
  var ampm = H < 12 ? ' AM' : ' PM'
  ts = h + ts.substr(2, 3) + ampm
  return ts
}

export function generatePassword() {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  var passwordLength = 6
  var password = ''
  for (var i = 0; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length)
    password += chars.substring(randomNumber, randomNumber + 1)
  }
  return password
}

export function roundToNearestHour(date) {
  date.setMinutes(date.getMinutes() + 30)
  date.setMinutes(0, 0, 0)
  if (date < new Date()) date.setMinutes(date.getMinutes() + 30)

  return date
}
