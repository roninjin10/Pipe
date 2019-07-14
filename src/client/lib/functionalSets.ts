type SetFunction = <T>(set: Set<T>, item: T) => Set<T>

export const removeFromSet: SetFunction = (set, item) => new Set([...set].filter(x => x !== item))

export const addToSet: SetFunction = (set, item) => new Set([...set, item])

export const toggleItem: SetFunction = (set, item) =>
  set.has(item) ? removeFromSet(set, item) : addToSet(set, item)
