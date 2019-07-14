import { IHomeAway, IPlayer } from './types'

interface IMaybeAsNumber {
  (field: string): string | number
  (field: IHomeAway): string
}

const maybeAsNumber: IMaybeAsNumber = (field: IHomeAway | string): any => {
  if (typeof field === 'object') {
    return field.home
  }

  if (isNaN(Number(field))) {
    return field
  }

  return Number(field)
}

type SortPool = (
  field: keyof IPlayer,
  playerPool: ReadonlyArray<IPlayer>,
  isReversed: boolean
) => ReadonlyArray<IPlayer>

export const sortPool: SortPool = (field, playerPool, isReversed) =>
  [...playerPool].sort((playerA: IPlayer, playerB: IPlayer) => {
    const [a, b] = [playerA, playerB].map(player => player[field])

    const [firstItem, secondItem] = (!isReversed ? [b, a] : [a, b]).map(item =>
      maybeAsNumber(item as any)
    )

    return firstItem >= secondItem ? 1 : -1
  })
