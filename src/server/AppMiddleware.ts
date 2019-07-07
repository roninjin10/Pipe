import session from 'express-session'
import morgan from 'morgan'
import passport from 'passport'
import { Strategy } from 'passport-local'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { ValidateUser } from './dao/Dao'
import { RequestHandler } from './services/Service'

export class AppMiddleware extends Array<RequestHandler> {
  constructor(validateUser: ValidateUser) {
    super(
      cors(),
      ...getBodyParser(),
      getMorgan(),
      cookieParser(),
      getSession(),
      ...getPassport(validateUser)
    )
  }
}

const getPassport = (validateUser: ValidateUser): [RequestHandler, RequestHandler] => {
  const strategy = new Strategy(async (username, password, done) => {
    try {
      const user = await validateUser(username, password)
      done(null, user)
    } catch (e) {
      done(null, false, e)
    }
  })

  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((user, done) => done(null, user))
  passport.use(strategy)

  return [passport.initialize(), passport.session()]
}

const getMorgan = (): RequestHandler =>
  morgan((tokens, req, res) =>
    [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      JSON.stringify(req.body),
      '\n',
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
    ].join(' ')
  )

const getSession = (): RequestHandler =>
  session({
    secret: 'good luck figuring out this secret ',
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: false,
    },
  })

const getBodyParser = (): [RequestHandler, RequestHandler] => [
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
]
