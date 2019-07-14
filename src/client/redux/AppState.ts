import { IHomeAway, INBALineup, IPlayer } from '../lib/types'

export interface IAppState {
  readonly games: ReadonlyArray<IHomeAway>
  readonly playerPool: ReadonlyArray<IPlayer>
  readonly lineup: INBALineup
  readonly playerSearch: string
  readonly filters: IFilters
  readonly sortBy: SortBy
  readonly isSortByReversed: boolean
  readonly initialPool: ReadonlyArray<IPlayer>
}

export type Team = Set<string>
export type Position = Set<string>

export interface IFilters {
  readonly team: Team
  readonly position: Team
}

export type SortBy = keyof IPlayer
