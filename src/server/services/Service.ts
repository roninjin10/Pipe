import { Router } from '../Router'
import { RequestHandler as ExpressRequestHandler } from 'express'
import { MaybeArray } from '../../utils/types'

export type RequestHandler = ExpressRequestHandler

export interface IService {
  readonly name: string
  readonly getRequestHandler: () => MaybeArray<RequestHandler>
  readonly start: () => Promise<void>
}

export abstract class Service implements IService {
  public abstract readonly getRequestHandler: () => RequestHandler | RequestHandler[]

  constructor(
    public readonly name: string,
    protected readonly router: Router,
    protected readonly middleware: RequestHandler[] = [],
    protected readonly services: Service[] = []
  ) {}

  public async start(): Promise<void> {
    for (const service of this.services) {
      await service.start()
    }
    await this.router.connectMiddleware(...this.middleware)
    await this.router.connectService(...this.services)
  }
}
