import { redirect } from 'redux-first-router'
import { setCurrentUser } from './modules/auth'
import jwtDecode from 'jwt-decode'

export default {
  HOME: '/',
  LIST: {
    path: '/list/:category',
    thunk: async (dispatch, getState) => {
      const { payload: { category } } = getState().location
      const packages = await fetch(`/api/category/${category}`)

      if (packages.length === 0) {
        const action = redirect({
          type: 'LIST',
          payload: { category: 'redux' }
        })

        return dispatch(action)
      }

      dispatch({ type: 'PACKAGES_FETCHED', payload: { category, packages } })
    }
  },
  GRAPH: {
    path: '/graph'
  },
  TOKEN: {
    path: '/token/:token',
    thunk: async (dispatch, getState) => {
      const { payload: { token } } = getState().location
      console.log('@TOKEN/token', token)
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
      // const action = redirect({
      //   type: 'HOME'
      // })
      // return dispatch(action)
    }
  }
}

// this is essentially faking/mocking the fetch api
// pretend this actually requested data over the network

const fetch = async path => {
  const category = path.replace('/api/category/', '')

  switch (category) {
    case 'redux':
      return ['reselect', 'recompose', 'redux-first-router']
    case 'react':
      return [
        'react-router',
        'react-transition-group',
        'react-universal-component'
      ]
    default:
      return []
  }
}
