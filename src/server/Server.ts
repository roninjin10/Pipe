import express from 'express'
import { IService } from './Service'

export class Server {
  constructor(private readonly expressServer = express()) {}

  public readonly start = async (app: IService, port: number) => {
    await app.start()

    this.expressServer.use('/', app.getHandler())

    await new Promise(resolve => this.expressServer.listen(port, resolve))

    console.log(`${app.name} started.  Now listening on port ${port}`)
  }
}
