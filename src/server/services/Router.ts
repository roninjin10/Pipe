import { Router as ExpressRouter, RequestHandler } from 'express'
import { IService } from './Service'
import { arrayify } from '../../utils/arrayify'
import { asyncNoop } from '../../utils/noop'

export class Router implements IService {
  public readonly name: string
  constructor(name: string, private readonly wrappedRouter: ExpressRouter) {
    this.name = `${name}Router`
  }

  public readonly getRequestHandler = () => this.wrappedRouter
  public readonly start = asyncNoop

  public readonly connectMiddleware = (...middlewares: RequestHandler[]): void => {
    middlewares.forEach(m => this.wrappedRouter.use(m))
  }

  public readonly connectService = (...services: IService[]): void => {
    services.forEach(service => {
      const route = `/${service.name}`
      const handlers = arrayify(service.getRequestHandler())
      this.connectHandlers(route, ...handlers)
    })
  }

  public readonly connectHandlers = (route: string, ...handlers: RequestHandler[]): void => {
    this.wrappedRouter.use(route, ...handlers)
  }
}
