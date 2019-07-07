import { Router } from '../Router'
import { Router as ExpressRouter } from 'express'

type Mocked<key extends keyof Router> = Router[key] & jest.Mock

export class MockRouter extends Router {
  constructor() {
    super('MockRouter', ExpressRouter())
  }

  public readonly connectMiddleware: Mocked<'connectMiddleware'> = jest.fn()

  public readonly connectService: Mocked<'connectService'> = jest.fn()

  public readonly connectHandlers: Mocked<'connectHandlers'> = jest.fn()
}
