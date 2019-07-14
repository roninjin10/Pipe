import React, { FunctionComponent } from 'react'
import { connect } from 'react-redux'
import { AnyAction } from 'redux'
import { filterPool } from '../lib/filterPool'
import { IPlayer, MapDispatchToProps, MapStateToProps } from '../lib/types'
import * as actions from '../redux/actions'

interface IStateProps {
  readonly playerPool: IPlayer[]
  readonly isInLineup: (player: string) => boolean
  readonly availableToAdd: (player: string) => boolean
}

interface IDispatchProps {
  readonly onClick: IPlayerPickerHeadingsProps['onClick']
  readonly addToPool: (playerId: string) => () => void
}

type PlayerPickerGridProps = IStateProps & IDispatchProps

const _PlayerPickerGrid: FunctionComponent<PlayerPickerGridProps> = ({
  playerPool,
  addToPool,
  onClick,
}) => {
  const playerPickerRows = playerPool.map(player => (
    <PlayerPickerRow player={player} onClick={addToPool(player.id)} key={player.id} />
  ))

  return (
    <table className="player-pool">
      <PlayerPickerHeadings onClick={onClick} />
      <tbody>{playerPickerRows}</tbody>
    </table>
  )
}

interface IPlayerPickerHeadingsProps {
  readonly onClick: (heading: keyof IPlayer) => () => AnyAction
}

const noop = () => undefined

export const PlayerPickerHeadings: FunctionComponent<IPlayerPickerHeadingsProps> = ({
  onClick,
}) => (
  <thead>
    <tr>
      <th onClick={onClick('gameInfo')}>GAME</th>
      <th onClick={onClick('position')}>POS</th>
      <th onClick={onClick('name')}>PLAYER</th>
      <th onClick={onClick('salary')}>SALARY</th>
      <th onClick={onClick('fantasyPoints')}>POINTS</th>
      <th onClick={noop}>VALUE</th>
    </tr>
  </thead>
)

interface IPlayerPickerRowProps {
  readonly player: IPlayer
  readonly onClick: () => void
}

export const PlayerPickerRow: FunctionComponent<IPlayerPickerRowProps> = ({
  player: { name, salary, gameInfo, position, fantasyPoints },
  onClick,
}) => {
  const value = (1000 * fantasyPoints) / salary
  const displayedValue = isNaN(value) ? '' : value.toFixed(1)

  const displayedGameInfo = gameInfo.home !== '' ? `${gameInfo.away}@${gameInfo.home}` : ''

  return (
    <tr onClick={onClick}>
      <td className="game">{displayedGameInfo}</td>
      <td className="position">{position}</td>
      <td className="nickname">{name}</td>
      <td className="salary">{salary || ''}</td>
      <td className="fantasy-points">{fantasyPoints || ''}</td>
      <td className="value">{displayedValue}</td>
    </tr>
  )
}

const getMapStateToProps: () => MapStateToProps<IStateProps> = () => {
  // tslint:disable-next-line:no-let
  let _filterPool: ReturnType<typeof filterPool>

  return state => {
    _filterPool = _filterPool || filterPool(state.playerPool)
    return {
      availableToAdd: () => true,
      isInLineup: playerId =>
        !!state.lineup.find(rosterSpot => !!rosterSpot && rosterSpot.id === playerId),
      playerPool: _filterPool(state.filters, state.playerSearch),
    }
  }
}

export const mapDispatchToProps: MapDispatchToProps<IDispatchProps> = dispatch => ({
  addToPool: playerId => () => dispatch(actions.addToLineup(playerId)),
  onClick: heading => () => dispatch(actions.setPlayerSort(heading)),
})

export const PlayerPickerGrid = connect(
  getMapStateToProps(),
  mapDispatchToProps
)(_PlayerPickerGrid)
