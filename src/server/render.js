import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'

import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'

import configureStore from './configureStore'
import App from '../common/components/App'
import {
  ApolloClient,
  createNetworkInterface,
  ApolloProvider,
  getDataFromTree
} from 'react-apollo'
import html from './html'
import keys from './config'
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express'
import 'isomorphic-fetch'

import morgan from 'morgan'
import bodyParser from 'body-parser'

import requestIp from 'request-ip'
import cors from 'cors'

import apiRouter from './api'
import schema from './graphql'

const DEV = process.env.NODE_ENV === 'development'
export const serverRender = ({ clientStats }) => async (req, res, next) => {
  const networkInterface = createNetworkInterface({
    uri: keys.GRAPHQL_URI
  })
  const client = new ApolloClient({
    networkInterface,
    ssr: true
  })

  const store = await configureStore(req, res, client)
  if (!store) return // no store means redirect was already served

  const app = createApp(App, store, client)

  const sheet = new ServerStyleSheet()
  const content = renderToString(sheet.collectStyles(app))
  const styled = sheet.getStyleTags()

  /**
   * Activar Apollo SSR
   * await getDataFromTree(app)
   */

  const state = JSON.stringify(store.getState())

  const chunkNames = flushChunkNames()
  const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames })

  const markup = html(content, state, styles, styled, cssHash, js)

  return res.send(markup)
}

export const initMiddleware = (app, express) => {
  app.use(morgan(!DEV ? 'combined' : 'dev'))
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(requestIp.mw())
  app.use('/api/v1', apiRouter)

  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

  app.use(
    '/graphql',
    graphqlExpress(req => ({
      schema
    }))
  )
}

const createApp = (App, store, client) => (
  <ApolloProvider client={client} store={store}>
    <App />
  </ApolloProvider>
)
