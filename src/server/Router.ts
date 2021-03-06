import { Router as ExpressRouter, RequestHandler } from 'express'
import { IService } from './services/Service'
import { arrayify } from '../utils/arrayify'
import { asyncNoop } from '../utils/noop'
import { RegistryFactory } from '../utils/Registry'

export interface Router extends RouterService {}

class RouterService implements IService {
  public readonly name: string
  constructor(name: string, private readonly wrappedRouter: ExpressRouter = ExpressRouter()) {
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

export class RouterRegistry extends RegistryFactory<Router> {
  constructor(wrappedRouter?: ExpressRouter) {
    super(name => new RouterService(name, wrappedRouter))
  }
}
