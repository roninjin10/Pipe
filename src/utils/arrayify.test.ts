import { arrayify } from './arrayify'

describe('arrayify', () => {
  it('should put a non array item into an array', () => {
    const item = 'some non array'

    const result = arrayify(item)

    expect(Array.isArray(result)).toBe(true)

    expect(result[0]).toBe(item)
  })
  it('if given an array should return that array', () => {
    const item = ['some item in an array']

    expect(arrayify(item)).toStrictEqual(item)
  })
})
