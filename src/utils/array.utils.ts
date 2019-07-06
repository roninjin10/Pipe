export type NonArray = Exclude<any, Array<any>>

export type MaybeArray<T extends NonArray> = T | Array<T>

export const maybeArrayToArray = <TItemType extends NonArray>(
  maybeArray: MaybeArray<TItemType>
): Array<TItemType> => (Array.isArray(maybeArray) ? maybeArray : [maybeArray])
