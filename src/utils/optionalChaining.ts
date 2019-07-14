import {throwIf} from './throwIf'

class Optional<T> {
  constructor(private readonly value: T) {}

  public readonly getOrThrow =  (errorMessage = 'Property does not exist') => {
    throwIf(this.isEmpty(), errorMessage)
    return this.value
  }

  public readonly getOrElse = <TOther extends any>(other: TOther) => {
    if (this.isEmpty()) {
      return other instanceof Optional ? other.getOrThrow() : other
    }
    return this.value
  }

  public readonly map = <TReturn extends any >(cb: (o: T) => TReturn): Optional<TReturn> => {
    if (this.isEmpty()) {
      return None
    } 
    return oc(cb(this.value))
  }

  public readonly isDefined = () => this !== None

  public readonly isEmpty = () => !this.isDefined()

  public readonly filter = (filterFunc: (o: T) => boolean) =>  {
    const passesFilter = this.isDefined() && filterFunc(this.value)
    return passesFilter ? this : None
  }
}

const None = new Optional({} as any)

export const oc = <T extends any>(o: T) => new Optional(o)
