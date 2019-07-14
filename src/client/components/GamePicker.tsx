import classNames from 'classnames'
import React, { FunctionComponent } from 'react'
import { connect } from 'react-redux'
import { IHomeAway, MapDispatchToProps, MapStateToProps } from '../lib/types'
import * as actions from '../redux/actions'

export interface IStateProps {
  readonly games: ReadonlyArray<IHomeAway>
  readonly getClassName: IGameCellProps['getClassName']
}

export interface IDispatchProps {
  readonly toggleTeamFilter: IGameCellProps['toggleTeamSelect']
  readonly toggleAllGames: IAllGamesPickerProps['toggleAllGames']
}

export type GamePickerProps = IStateProps & IDispatchProps

const _GamePicker: FunctionComponent<GamePickerProps> = ({
  games,
  toggleTeamFilter,
  toggleAllGames,
  getClassName,
}) => {
  const renderedGames = games.map(({ home, away }) => (
    <GameCell
      home={home}
      away={away}
      toggleTeamSelect={toggleTeamFilter}
      getClassName={getClassName}
      key={home}
    />
  ))

  return (
    <ul className="GamePicker">
      <AllGamesPicker gameCount={games.length} toggleAllGames={toggleAllGames} />
      {renderedGames}
    </ul>
  )
}

interface IGameCellProps {
  readonly home: string
  readonly away: string
  readonly toggleTeamSelect: (team: string) => () => void
  readonly getClassName: (team: string) => string
}

const GameCell: FunctionComponent<IGameCellProps> = ({
  toggleTeamSelect,
  getClassName,
  home,
  away,
}) => (
  <li>
    <div onClick={toggleTeamSelect(away)} className={getClassName(away)}>
      {away}
    </div>
    <div onClick={toggleTeamSelect(home)} className={getClassName(home)}>
      {'@' + home}
    </div>
  </li>
)

interface IAllGamesPickerProps {
  readonly gameCount: number
  readonly toggleAllGames: () => void
}

const AllGamesPicker: FunctionComponent<IAllGamesPickerProps> = ({ toggleAllGames, gameCount }) => (
  <li onClick={toggleAllGames}>
    <div>{`All Games (${gameCount})`}</div>
  </li>
)

const mapStateToProps: MapStateToProps<IStateProps> = ({ games, filters }) => ({
  games,
  getClassName: team => classNames({ selected: filters.team.has(team) }),
})

const mapDispatchToProps: MapDispatchToProps<IDispatchProps> = dispatch => ({
  toggleAllGames: () => dispatch(actions.toggleAllGames()),
  toggleTeamFilter: team => () => dispatch(actions.toggleTeamFilter(team)),
})

export const GamePicker = connect(
  mapStateToProps,
  mapDispatchToProps
)(_GamePicker)
