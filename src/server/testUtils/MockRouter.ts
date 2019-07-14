import { RouterRegistry, Router } from '../Router'

type Mocked<key extends keyof Router> = Router[key] & jest.Mock

export class MockRouter implements Router {
  public readonly name = 'MockRouter'

  public readonly connectMiddleware: Mocked<'connectMiddleware'> = jest.fn()

  public readonly connectService: Mocked<'connectService'> = jest.fn()

  public readonly connectHandlers: Mocked<'connectHandlers'> = jest.fn()
}
