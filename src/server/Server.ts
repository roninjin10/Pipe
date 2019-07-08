import express, { Express } from 'express'
import { IService } from './services/Service'

export class Server {
  constructor(private readonly expressServer: Express = express()) {}

  public readonly start = async (app: IService, port: number): Promise<void> => {
    await app.start()

    this.expressServer.use(app.getRequestHandler())

    return new Promise(resolve => this.expressServer.listen(port, resolve))
  }
}
