export type PublicMembers<T> = { [TKey in keyof T]: T[TKey] }

export type FirstArg<TFunction extends Function> = TFunction extends (
  firstArg: infer TFirstArg,
  ...args: any[]
) => any
  ? TFirstArg
  : never

export type SecondArg<TFunction extends Function> = TFunction extends (
  firstArg: any,
  secondArg: infer TSecondArg,
  ...args: any[]
) => any
  ? TSecondArg
  : never

export type AsyncReturnType<
  TFunction extends (...args: any[]) => any,
  TReturnType = ReturnType<TFunction>
> = TReturnType extends Promise<infer TPromiseReturn> ? TPromiseReturn : TReturnType

export type NonArray = Exclude<any, Array<any>>

export type MaybeArray<T extends NonArray> = T | Array<T>

export type ReadonlyRecord<TKey extends string | number | symbol, TValue> = {
  readonly [key in TKey]: TValue
}
