import { reducerWithInitialState } from 'typescript-fsa-reducers/dist'
import * as actions from './actions'
import { INITIAL_STATE } from './initialState'

export const workerReducers = reducerWithInitialState(INITIAL_STATE)
  .case(actions.removeFromLineup, actions.removeFromLineupHandler)
  .case(actions.addToLineup, actions.addToLineupHandler)
  .case(actions.setPlayerSort, actions.setPlayerSortHandler)
  .case(actions.toggleTeamFilter, actions.toggleTeamFilterHandler)
  .case(actions.togglePositionFilter, actions.togglePositionFilterHandler)
  .case(actions.toggleAllGames, actions.toggleAllGamesHandler)
  .case(actions.setPickerSearch, actions.setPickerSearchHandler)
  .build()

export const proxyReducers = reducerWithInitialState(INITIAL_STATE)
  .case(actions.updateState, actions.updateStateHandler)
  .build()
