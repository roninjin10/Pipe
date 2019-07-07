import { Router } from './Router'
import { asyncNoop } from '../../utils/noop'
import { mockHandlerFactory } from '../testUtils/mockHandler'
import { MockService } from '../testUtils/MockService'

class MockExpressRouter {
  public readonly use = jest.fn()
}

describe('Router', () => {
  let router: Router
  let mockExpressRouter: MockExpressRouter
  const name = 'RouterName'

  const setupRouter = () => {
    mockExpressRouter = new MockExpressRouter()
    router = new Router(name, mockExpressRouter as any)
  }

  describe('Router.prototype.getRequestHandler', () => {
    beforeEach(setupRouter)
    it('should return wrapped handler', () => {
      expect(router.getRequestHandler()).toBe(mockExpressRouter)
    })
  })

  describe('Router.prototype.start', () => {
    beforeEach(setupRouter)
    it('should do nothing on start', () => {
      expect(router.start).toBe(asyncNoop)
    })
  })

  describe('Router.prototype.connectMiddleware', () => {
    beforeEach(setupRouter)
    it('should call expressRouter.use for all middlewares', () => {})
  })

  describe('Router.prototype.connectService', () => {
    setupRouter()

    const service0 = new MockService('mockService0')
    const service1 = new MockService('mockService1')

    router.connectService(service0, service1)

    const mockUse = mockExpressRouter.use.mock.calls

    it('should connect services in order', () => {
      expect(mockUse[0][0]).toBe('/' + service0.name)
      expect(mockUse[1][0]).toBe('/' + service1.name)
    })

    it('should attatch the handler to a route matching that services name', () => {
      expect(mockUse[0][0]).toBe('/' + service0.name)
    })

    it('should pass in services handler to route', () => {
      expect(mockUse[0][1]).toBe(service0.getRequestHandler())
    })
  })

  describe('Router.prototype.connectHandlers', () => {
    setupRouter()

    const route = '/aroute'
    const handlers = [mockHandlerFactory(), mockHandlerFactory()]
    router.connectHandlers(route, ...handlers)

    const call = mockExpressRouter.use.mock.calls[0]

    it('should call expressRouter.use on the route and the handlers', () => {
      expect(call[0]).toBe(route)
      expect(call[1]).toBe(handlers[0])
      expect(call[2]).toBe(handlers[1])
    })
  })
})
