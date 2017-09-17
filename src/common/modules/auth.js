import jwtDecode from 'jwt-decode'
import isEmpty from 'lodash/isEmpty'

// export const setAuthorizationToken = (token) => {
//   if (token) {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
//   } else {
//     delete axios.defaults.headers.common['Authorization']
//   }
// }

export const SET_CURRENT_USER = 'SET_CURRENT_USER'

const initialState = {
  isAuthenticated: false,
  user: {}
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      }
    default: return state
  }
}

export function logout () {
  return dispatch => {
    localStorage.removeItem('jwtToken')
    // setAuthorizationToken(false)
    dispatch(setCurrentUser({}))
  }
}
export const verifyTokenSSR = token => dispatch => {
  try {
    let decoded = jwtDecode(token)
    let currentTime = Math.floor(Date.now() / 1000)
    if (currentTime < decoded.exp) {
      dispatch(setCurrentUser(decoded))
    } else {
      dispatch(setCurrentUser({}))
    }
  } catch (error) {
    dispatch(setCurrentUser({}))
  }
}
export function setToken (token) {
  return new Promise((resolve, reject) => {
    localStorage.setItem('jwtToken', token)
    // setAuthorizationToken(token)
    resolve()
  })
}
export const verifyToken = token => dispatch => {
  let decoded = jwtDecode(token)
  let currentTime = Math.floor(Date.now() / 1000)
  if (currentTime < decoded.exp) {
    localStorage.setItem('jwtToken', token)
    // setAuthorizationToken(token)
    dispatch(setCurrentUser(decoded))
  } else {
    localStorage.removeItem('jwtToken')
    setAuthorizationToken(false)
    dispatch(setCurrentUser({}))
  }
}

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
})
