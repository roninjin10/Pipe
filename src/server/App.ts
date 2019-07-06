import { AppMiddlewares } from './AppMiddlewares'
import { Service } from './Service'
import { AppServices } from './AppServices'

export class App extends Service {
  constructor(middlewares: AppMiddlewares, services: AppServices) {
    super('App', middlewares, services)
  }
  public readonly getRequestHandler = () => this.router.getRequestHandler()
}
