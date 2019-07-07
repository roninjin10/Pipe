import { RequestHandler } from '../Service'

export const mockHandlerFactory = (): RequestHandler & jest.Mock => jest.fn()
