const config = {
  PORT: process.env.PORT || 3000,
  POSTGRES: {
    host: '192.168.99.100',
    port: '5432',
    password: 'secretpassword',
    user: 'postgres',
    dialect: 'postgres',
    name: 'test-dev'
  },
  GRAPHQL_URI: `http://localhost:${process.env.PORT || 3000}/graphql`,
  GRAPHQL_PATH: '/graphql',
  MONGO_URI: 'mongodb://192.168.99.100:27017/test-dev',
  JWT_SECRET: 'secret',
  isProduction: process.env.NODE_ENV === 'production'
}
const userRoles = (config.userRoles = {
  guest: 1, // ...001
  user: 2, // ...010
  admin: 4 // ...100
})
config.accessLevels = {
  guest: userRoles.guest | userRoles.user | userRoles.admin, // ...111
  user: userRoles.user | userRoles.admin, // ...110
  admin: userRoles.admin // ...100
}
export default config
