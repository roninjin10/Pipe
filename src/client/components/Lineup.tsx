import React, { StatelessComponent } from 'react'
import { connect } from 'react-redux'
import { IPlayer, MapDispatchToProps, MapStateToProps, ZeroThroughEight } from '../lib/types'
import * as actions from '../redux/actions'
import { PlayerPickerRow } from './PlayerPickerGrid'

type AggregateStat = (lineup: ReadonlyArray<IPlayer | null>) => string

const positions: ['PG', 'SG', 'SF', 'PF', 'C', 'G', 'F', 'UTIL'] = [
  'PG',
  'SG',
  'SF',
  'PF',
  'C',
  'G',
  'F',
  'UTIL',
]

const sum = (a: number, b: number) => a + b

const onlyPlayers = (players: ReadonlyArray<IPlayer | null>) =>
  players.filter(player => player) as ReadonlyArray<IPlayer>

const getPoints: AggregateStat = lineup =>
  onlyPlayers(lineup)
    .map(({ fantasyPoints }) => fantasyPoints)
    .map(Number)
    .reduce(sum, 0)
    .toFixed(1)

const getSalary: AggregateStat = lineup =>
  onlyPlayers(lineup)
    .map(({ salary }) => salary)
    .map(Number)
    .reduce(sum, 0)
    .toFixed(0)

const validateZeroThroughEight = (n: number): ZeroThroughEight => {
  if (!Number.isInteger(n) || n < 0 || n > 8) {
    throw new Error(`${n} is not an integer between zero and eight`)
  }
  return n as ZeroThroughEight
}

const makeNullPlayer = (position: string): IPlayer => ({
  fantasyPoints: 0,
  gameInfo: { home: '', away: '' },
  id: '',
  name: '',
  namePlusId: '',
  position,
  rosterPosition: '',
  salary: 0,
  team: '',
})

interface IStateProps {
  readonly lineup: ReadonlyArray<IPlayer | null>
}

interface IDispatchProps {
  readonly removeFromLineup: (i: ZeroThroughEight) => () => void
}

type LineupProps = IStateProps & IDispatchProps

const _Lineup: StatelessComponent<LineupProps> = ({ lineup, removeFromLineup }) => {
  const renderedLineups = lineup.map((player, i) => (
    <PlayerPickerRow
      player={player || makeNullPlayer(positions[i])}
      key={i}
      onClick={removeFromLineup(validateZeroThroughEight(i))}
    />
  ))

  return (
    <div className="Lineup">
      <table className="EditableLineup-container">
        <thead>
          <tr>
            <th>GAME</th>
            <th>POS</th>
            <th>PLAYER</th>
            <th>SALARY</th>
            <th>PROJECTION</th>
            <th>VALUE</th>
          </tr>
        </thead>
        <tbody>{renderedLineups}</tbody>
      </table>
      <div>FantasyPoints: {getPoints(lineup)}</div>
      <div>SalaryUsed: {getSalary(lineup)}</div>
    </div>
  )
}

const mapStateToProps: MapStateToProps<IStateProps> = state => ({ lineup: state.lineup })

const mapDispatchToProps: MapDispatchToProps<IDispatchProps> = dispatch => ({
  removeFromLineup: i => () => dispatch(actions.removeFromLineup(i)),
})

export const Lineup = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Lineup)
