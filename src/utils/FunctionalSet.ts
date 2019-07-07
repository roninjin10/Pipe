type SetFunction<T> = (item: T) => FunctionalSet<T>

export class FunctionalSet<T> {
  private readonly set: Set<T>

  constructor(items: T[] | Set<T>) {
    this.set = new Set(items)
  }

  remove: SetFunction<T> = item => new FunctionalSet([...this.set].filter(x => x !== item))
  add: SetFunction<T> = item => new FunctionalSet([...this.set, item])
  toggle: SetFunction<T> = item => (this.set.has(item) ? this.remove(item) : this.add(item))
}
