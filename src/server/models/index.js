import Sequelize from 'sequelize'

import keys from '../config'

const sequelize = new Sequelize(
  'test-dev',
  keys.POSTGRES.user,
  keys.POSTGRES.password,
  {
    host: keys.POSTGRES.host,
    port: keys.POSTGRES.port,
    dialect: keys.POSTGRES.dialect
  },
  {
    logging: false
  }
)

const db = {}
db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
