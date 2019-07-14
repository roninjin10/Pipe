import actionCreatorFactory from 'typescript-fsa'
import * as functionalSets from '../lib/functionalSets'
import { addPlayersToNbaLineup, removePlayer } from '../lib/nbaLineup'
import { IPlayer, ZeroThroughEight } from '../lib/types'
import { IAppState, IFilters } from './AppState'

// can pass in an isError function here
const actionCreator = actionCreatorFactory('app')

type PlayerId = string

type ActionHandler<T> = (state: IAppState, payload: T) => IAppState

export const addToLineup = actionCreator<PlayerId>('addToLineup')
export const addToLineupHandler: ActionHandler<PlayerId> = (state, id) => {
  const newPlayer = state.playerPool.find(player => player.id === id)!

  const playerPool = state.playerPool.filter(player => player !== newPlayer)

  try {
    return {
      ...state,
      lineup: addPlayersToNbaLineup(...state.lineup, newPlayer),
      playerPool,
    }
  } catch (e) {
    console.error('unable to add player to lineup', e)
    return state
  }
}

export const removeFromLineup = actionCreator<ZeroThroughEight>('removeFromLineup')
export const removeFromLineupHandler: ActionHandler<ZeroThroughEight> = (state, playerIndex) => {
  const player = state.lineup[playerIndex]

  if (!player) {
    return state
  }

  const playerPool: ReadonlyArray<IPlayer> = [...state.playerPool, player]

  const lineup = removePlayer(
    addPlayersToNbaLineup(...state.lineup),
    playerIndex as ZeroThroughEight
  )

  return {
    ...state,
    lineup,
    playerPool,
  }
}

export const setPlayerSort = actionCreator<keyof IPlayer>('setPlayerSort')
export const setPlayerSortHandler: ActionHandler<keyof IPlayer> = (state, sortBy) => ({
  ...state,
  isSortByReversed: sortBy === state.sortBy && !state.isSortByReversed,
  sortBy,
})

interface IToggleFilterHandlerPayload {
  readonly item: string
  readonly filter: keyof IFilters
}

const toggleFilterHandler: ActionHandler<IToggleFilterHandlerPayload> = (
  state,
  { item, filter }
) => ({
  ...state,
  filters: {
    ...state.filters,
    [filter]: functionalSets.toggleItem(state.filters[filter], item),
  },
})

export const toggleTeamFilter = actionCreator<string>('toggleTeamFilter')
export const toggleTeamFilterHandler: ActionHandler<string> = (state, team) =>
  toggleFilterHandler(state, {
    filter: 'team',
    item: team,
  })

const allTeams = (games: IAppState['games']) =>
  games.reduce((a, { home, away }) => [...a, home, away], [] as ReadonlyArray<string>)

export const toggleAllGames = actionCreator<undefined>('toggleAllGames')
export const toggleAllGamesHandler: ActionHandler<undefined> = state => ({
  ...state,
  filters: {
    ...state.filters,
    team: state.filters.team.size ? new Set() : new Set(allTeams(state.games)),
  },
})

export const togglePositionFilter = actionCreator<string>('togglePositionFilter')
export const togglePositionFilterHandler: ActionHandler<string> = (state, position) =>
  toggleFilterHandler(state, {
    filter: 'position',
    item: position,
  })

export const setPickerSearch = actionCreator<string>('setPickerSearch')
export const setPickerSearchHandler: ActionHandler<string> = (state, searchString) => ({
  ...state,
  playerSearch: searchString,
})

export const updateState = actionCreator<IAppState>('__updateState__')
export const updateStateHandler: ActionHandler<IAppState> = (_, newState) => newState
