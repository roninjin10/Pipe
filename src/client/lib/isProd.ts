const NODE_ENV = process.env.NODE_ENV

export const IS_PROD = NODE_ENV === 'production'

export const spreadIfProd = <T>(obj: T): T | {} => {
  if (!IS_PROD) {
    return Array.isArray(obj) ? [] : {}
  }
  return obj
}
