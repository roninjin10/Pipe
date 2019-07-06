import express, { Express } from 'express'
import { asyncNoop } from '../utils/noop'
import { Server } from './Server'

class MockService {
  handler = asyncNoop
  getHandler = jest.fn(() => this.handler)
  start = jest.fn()
}

describe('Server', () => {
  let app: MockService
  const port = 3000
  let expressServer: Express
  let server: Server
  let listenSpy = jest.fn()
  let useSpy = jest.fn()

  beforeEach(async () => {
    listenSpy = jest.fn((port: number, resolve: any) => resolve())
    useSpy = jest.fn()

    app = new MockService()
    expressServer = express()
    server = new Server(expressServer)

    expressServer.listen = listenSpy as any
    expressServer.use = useSpy

    await server.start(app as any, port)
  })

  it('Should start app', async () => {
    expect(app.start.mock.calls.length).toBe(1)
  })

  it('Should pass app handler to / route of express server', async () => {
    const [firstArg, secondArg] = useSpy.mock.calls[0]

    expect(firstArg).toBe('/')
    expect(secondArg).toBe(app.handler)
  })

  it('Should listen to a specified port', async () => {
    expect(listenSpy.mock.calls[0][0]).toBe(port)
  })
})
