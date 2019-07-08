import { Service, RequestHandler } from './services/Service'
import { Router } from './Router'

export class App extends Service {
  constructor(router: Router, middlewares: RequestHandler[], services: Service[]) {
    super('App', router, middlewares, services)
  }
  public readonly getRequestHandler = () => this.router.getRequestHandler()
}
