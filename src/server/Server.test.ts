import { Express } from 'express'
import { Server } from './Server'
import { MockService } from './testUtils/MockService'

class MockExpressServer {
  public readonly listen = jest.fn((port: number, resolve: any) => resolve())
  public readonly use = jest.fn()
}

describe('Server', () => {
  let app: MockService
  const port = 3000
  let server: Server
  let expressServer: MockExpressServer

  describe('Server.proptotype.start', () => {
    beforeEach(async () => {
      app = new MockService()
      expressServer = new MockExpressServer()
      server = new Server(expressServer as any)

      await server.start(app, port)
    })

    it('Should start app', async () => {
      expect(app.start.mock.calls.length).toBe(1)
    })

    it('Should pass app handler to / route of express server', async () => {
      expect(expressServer.use.mock.calls[0][0]).toBe(app.handler)
    })

    it('Should listen to a specified port', async () => {
      expect(expressServer.listen.mock.calls[0][0]).toBe(port)
    })
  })
})
