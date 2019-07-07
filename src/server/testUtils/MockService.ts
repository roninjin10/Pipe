import { IService, Service, RequestHandler } from '../Service'
import { MockRouter } from './MockRouter'
import { mockHandlerFactory } from './mockHandler'

export class MockIService implements IService {
  public readonly name = 'MockService'

  public readonly handler = mockHandlerFactory()

  public readonly getRequestHandler = jest.fn(() => this.handler) as IService['getRequestHandler'] &
    jest.Mock

  public readonly start = jest.fn() as IService['start'] & jest.Mock
}

export class MockService extends Service {
  constructor(
    public readonly name = 'MockService',
    public readonly middleware: RequestHandler[] & jest.Mock[] = [],
    public readonly services: MockService[] = [],
    public readonly router: MockRouter = new MockRouter()
  ) {
    super(name, middleware, services, router)
  }

  public readonly handler = mockHandlerFactory()

  public readonly getRequestHandler = jest.fn(() => this.handler) as IService['getRequestHandler'] &
    jest.Mock

  public readonly start = jest.fn() as IService['start'] & jest.Mock
}
