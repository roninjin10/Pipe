import { noop } from './noop'

export const throwIf = (predicate: boolean, errorMessage: string): void | never => {
  if (predicate) {
    throw new Error(errorMessage)
  }
  return noop()
}

const existsOrThrows = (errorMessage = 'Does not exist') => <T extends any>(o: T): NonNullable<T> => {
  throwIf(!o, errorMessage)
  return o as NonNullable<T>
}
