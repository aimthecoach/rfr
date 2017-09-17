import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import AppContainer from 'react-hot-loader/lib/AppContainer'
import {
  ApolloClient,
  createNetworkInterface,
  ApolloProvider
} from 'react-apollo'
import App from '../common/components/App'
import configureStore from '../common/configureStore'
import keys from '../server/config'

const history = createHistory()

const networkInterface = createNetworkInterface({
  uri: keys.GRAPHQL_URI
})
const initialState = window.__APOLLO_STATE__

const client = new ApolloClient({
  initialState,
  networkInterface,
  ssrForceFetchDelay: 100
})
console.log('@client/initalState', initialState)
const { store } = configureStore(history, client, initialState)

const render = App => {
  const root = document.getElementById('root')

  ReactDOM.render(
    <AppContainer>
      <ApolloProvider client={client} store={store}>
        <App />
      </ApolloProvider>
    </AppContainer>,
    root
  )
}

render(App)

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept('../common/components/App', () => {
    const App = require('../common/components/App').default
    render(App)
  })
}
