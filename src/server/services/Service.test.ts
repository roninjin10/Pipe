import { Service, RequestHandler } from './Service'
import { MockService } from '../testUtils/MockService'
import { MockRouter } from '../testUtils/MockRouter'
import { mockHandlerFactory } from '../testUtils/mockHandler'

class DerivedService extends Service {
  getRequestHandler = () => this.router.getRequestHandler()
}

describe('Service', () => {
  describe('Service.prototype.start', () => {
    const name = 'TestService'
    let service: DerivedService
    let middleware: [RequestHandler, RequestHandler]
    let services: [MockService, MockService]
    let router: MockRouter

    beforeEach(async () => {
      middleware = [mockHandlerFactory(), mockHandlerFactory()]

      services = [new MockService(), new MockService()]

      router = new MockRouter()

      service = new DerivedService(name, router, middleware, services)

      await service.start()
    })

    it('Should start every sub service', () => {
      services.forEach(service => {
        expect(service.start.mock.calls.length).toBe(1)
      })
    })

    it('should connect middleware on start', () => {
      const connectMiddlewareCall: RequestHandler[] = router.connectMiddleware.mock.calls[0]

      expect(connectMiddlewareCall.length).toBe(middleware.length)

      connectMiddlewareCall.forEach((arg, i) => {
        expect(arg).toStrictEqual(middleware[i])
      })
    })

    it('should connect services on start', () => {
      const connectServicesCall: Service[] = router.connectService.mock.calls[0]

      expect(connectServicesCall.length).toBe(services.length)

      connectServicesCall.forEach((arg, i) => {
        expect(arg).toStrictEqual(services[i])
      })
    })
  })
})
