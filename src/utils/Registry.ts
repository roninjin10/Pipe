import { throwIf } from './throwIf'

export class Registry<TItems> {
  private readonly record: Record<string, TItems> = {}

  public readonly get = (name: string): TItems => {
    const item = this.record[name]

    throwIf(!item, `No item registered under name ${name}`)

    return item
  }

  public readonly set = (name: string, item: TItems): void => {
    throwIf(name in this.record, `Name ${name} has already been registered`)
    this.record[name] = item
  }
}

export class RegistryFactory<TClass> {
  private readonly registry = new Registry<TClass>()

  constructor(private readonly factory: (name: string) => TClass) {}

  public readonly get = (name: string) => this.registry.get(name)

  public readonly build = (name: string) => {
    const instance = this.factory(name)
    this.registry.set(name, instance)
    return instance
  }
}
