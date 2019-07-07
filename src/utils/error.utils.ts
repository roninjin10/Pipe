import { noop } from '@babel/types'

export function throwIf(predicate: false, errorMessage: string): void
export function throwIf(predicate: true, errorMessage: string): never
export function throwIf(predicate: boolean, errorMessage: string) {
  if (predicate) {
    throw new Error(errorMessage)
  }
  return noop()
}
