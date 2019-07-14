import { IFilters } from '../redux/AppState'
import { buildAutoCompleter } from './buildAutoCompleter'
import { IPlayer } from './types'

export type FilterWithFilters = (filters: IFilters) => (player: IPlayer) => boolean
export type FilterByString = (
  playerFinder: ReturnType<typeof buildAutoCompleter>
) => (searchString: string) => IPlayer[]

const filterTeam: FilterWithFilters = filters => player =>
  filters.team.size === 0 || filters.team.has(player.team)

const filterPosition: FilterWithFilters = filters => player => {
  const positionFilter = filters.position

  const [position1, position2 = 'NONE'] = player.position.split('/')

  return positionFilter.size === 0 || positionFilter.has(position1) || positionFilter.has(position2)
}

export type PoolFilter = (
  pool: ReadonlyArray<IPlayer>
) => (filters: IFilters, searchString: string) => IPlayer[]

const poolAsObject = (pool: ReadonlyArray<IPlayer>): { [playerName in string]: IPlayer } =>
  pool.reduce((a, player) => ({ ...a, [player.name]: player }), {})

export const filterPool: PoolFilter = pool => {
  const playerFinder = buildAutoCompleter(poolAsObject(pool))

  return (filters, searchString) =>
    playerFinder(searchString)
      .filter(filterTeam(filters))
      .filter(filterPosition(filters))
}
