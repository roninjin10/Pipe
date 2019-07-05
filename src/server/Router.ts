import { Router as ExpressRouter, RequestHandler } from 'express'
import { IService } from './Service'
import { asyncNoop } from '../utils/noop'
import { maybeArrayToArray } from '../utils/array.utils'

export class Router implements IService {
  constructor(readonly name: string, private readonly wrappedRouter = ExpressRouter()) {
    this.name = `${name}Router`
  }

  public readonly getHandler = () => this.wrappedRouter
  public readonly start = asyncNoop

  public readonly connectMiddleware = (...middlewares: RequestHandler[]): void => {
    middlewares.forEach(m => this.wrappedRouter.use(m))
  }

  public readonly connectService = (...services: IService[]) => {
    services.forEach(service => {
      const route = `/${service.name}`
      const handlers = maybeArrayToArray(service.getHandler())
      this.connectHandlers(route, ...handlers)
    })
  }

  public readonly connectHandlers = (route: string, ...handlers: RequestHandler[]): void => {
    this.wrappedRouter.use(route, ...handlers)
  }
}
