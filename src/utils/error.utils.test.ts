import { throwIf } from './error.utils'

describe('error utils', () => {
  describe('throwIf', () => {
    const errorMessage = 'errorMessage'

    it('should throw if predicate is true', () => {
      expect(() => throwIf(true, errorMessage)).toThrowError(errorMessage)
    })

    it('should not throw if predicate is false', () => {
      expect(() => throwIf(false, errorMessage)).not.toThrow()
    })
  })
})
