import { NonArray, MaybeArray } from './types'

export const arrayify = <TItemType extends NonArray>(
  maybeArray: MaybeArray<TItemType>
): Array<TItemType> => (Array.isArray(maybeArray) ? maybeArray : [maybeArray])
