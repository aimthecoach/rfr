import 'babel-polyfill'
import express from 'express'
import webpack from 'webpack'
import compression from 'compression'

import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackHotServerMiddleware from 'webpack-hot-server-middleware'
import clientConfig from '../../webpack/client.dev'
import serverConfig from '../../webpack/server.dev'

const DEV = process.env.NODE_ENV === 'development'
const publicPath = clientConfig.output.publicPath
const outputPath = clientConfig.output.path

const app = express()

// UNIVERSAL HMR + STATS HANDLING GOODNESS:

if (DEV) {
  const {initMiddleware} = require('./render').default
  initMiddleware(app, express)
  const multiCompiler = webpack([clientConfig, serverConfig])
  const clientCompiler = multiCompiler.compilers[0]
  app.use(webpackDevMiddleware(multiCompiler, { publicPath }))
  app.use(webpackHotMiddleware(clientCompiler))
  app.use(
    // keeps serverRender updated with arg: { clientStats, outputPath }
    webpackHotServerMiddleware(multiCompiler, {
      serverRendererOptions: { outputPath }
    })
  )
} else {
  app.use(compression())

  const clientStats = require('../../dist/buildClient/stats.json') // eslint-disable-line import/no-unresolved
  const {
    serverRender,
    initMiddleware
  } = require('../../dist/buildServer/main.js') // eslint-disable-line import/no-unresolved
  initMiddleware(app, express)
  app.use(publicPath, express.static(outputPath))
  app.use(serverRender({ clientStats, outputPath }))
}

app.listen(3000, () => {
  console.log('Listening @ http://localhost:3000/')
})
