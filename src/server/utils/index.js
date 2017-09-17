import chalk from 'chalk'

const { log } = console

export const createLogger = (prefix, color) =>
  log.bind(console, `[${chalk[color](prefix)}]`)

export const moldeFacebookData = ({
  id,
  displayName,
  name,
  emails,
  photos,
  _json
}) => ({
  id,
  displayName,
  email: emails[0].value,
  photo: photos[0].value,
  verified: _json.verified,
  first_name: _json.first_name,
  last_name: _json.last_name
})

export const allowOnly = (accessLevel, callback) => {
  const checkUserRole = (req, res) => {
    if (!(accessLevel & req.user.role)) {
      res.sendStatus(403)
      return
    }

    callback(req, res)
  }

  return checkUserRole
}

export const isLoggedInMiddleware = (req, res, next) => {
  req.loggedIn = !!req.user
  next()
}
export const isAuthenticated = (req, res, next) => {
  if (!req.loggedIn) {
    res.redirect('/')
  }
  next()
}
