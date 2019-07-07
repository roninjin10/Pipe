import express from 'express'
import { IService } from './Service'

export class Server {
  constructor(private readonly expressServer = express()) {}

  public readonly start = async (app: IService, port: number): Promise<void> => {
    await app.start()

    this.expressServer.use(app.getRequestHandler())

    await new Promise(resolve => this.expressServer.listen(port, resolve))

    console.log(`${app.name} started.  Now listening on port ${port}`)
  }
}
