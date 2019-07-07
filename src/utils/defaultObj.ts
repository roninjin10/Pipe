type Key = string

export const defaultObj = <
  TValue,
  TDefaultValue extends TValue,
  TObject extends Record<Key, TValue> = Record<Key, TValue>
>(
  defaultValue: TDefaultValue,
  obj: TObject
): TObject =>
  new Proxy(obj, {
    get: (target: TObject, key: Key) => (target[key] ? target[key] : defaultValue),
  })
