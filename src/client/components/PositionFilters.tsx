import classNames from 'classnames'
import React, { FunctionComponent } from 'react'
import { connect } from 'react-redux'
import { MapDispatchToProps, MapStateToProps } from '../lib/types'
import * as actions from '../redux/actions'

const POSITIONS: ['PG', 'SG', 'SF', 'PF', 'C'] = ['PG', 'SG', 'SF', 'PF', 'C']

interface IStateProps {
  readonly getClassName: (position: string) => string
  readonly positions: ReadonlyArray<string>
}

interface IDispatchProps {
  readonly onClickHandler: (position: string) => () => void
}

type AllProps = IStateProps & IDispatchProps

const _PositionFilters: FunctionComponent<AllProps> = ({
  getClassName,
  onClickHandler,
  positions,
}) => {
  const filters = positions.map(position => (
    <button className={getClassName(position)} onClick={onClickHandler(position)} key={position}>
      {position}
    </button>
  ))
  return <div className="pool-filters">{filters}</div>
}
const mapStateToProps: MapStateToProps<IStateProps> = ({
  playerPool,
  lineup,
  games,
  sortBy,
  isSortByReversed,
  filters,
}) => ({
  getClassName: () => classNames({ selected: false }),
  positions: POSITIONS,
})

const mapDispatchToProps: MapDispatchToProps<IDispatchProps> = dispatch => ({
  onClickHandler: position => () => dispatch(actions.togglePositionFilter(position)),
})

export const PositionFilters = connect(
  mapStateToProps,
  mapDispatchToProps
)(_PositionFilters)
