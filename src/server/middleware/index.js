import { graphiqlExpress, graphqlExpress } from 'apollo-server-express'
import 'isomorphic-fetch'

import morgan from 'morgan'
import bodyParser from 'body-parser'

import requestIp from 'request-ip'
import cors from 'cors'

import apiRouter from '../api'
import schema from '../graphql'

const DEV = process.env.NODE_ENV === 'development'

export default function (app, express) {
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
