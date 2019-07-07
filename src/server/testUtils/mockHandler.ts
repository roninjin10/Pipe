import { RequestHandler } from '../services/Service'

export const mockHandlerFactory = (): RequestHandler & jest.Mock => jest.fn()
