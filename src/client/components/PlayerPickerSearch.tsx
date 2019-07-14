import React, { ChangeEvent, FunctionComponent } from 'react'
import { connect } from 'react-redux'
import { MapDispatchToProps, MapStateToProps } from '../lib/types'
import * as actions from '../redux/actions'

interface IStateProps {
  readonly value: string
}
interface IDispatchProps {
  readonly onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

type PlayerPickerSearchProps = IStateProps & IDispatchProps

const _PlayerPickerSearch: FunctionComponent<PlayerPickerSearchProps> = ({ value, onChange }) => (
  <div>
    <input className="PlayerPickerSearch" type="text" value={value} onChange={onChange} />
  </div>
)

const mapDispatchToProps: MapDispatchToProps<IDispatchProps> = dispatch => ({
  onChange: e => dispatch(actions.setPickerSearch(e.target.value)),
})

const mapStateToProps: MapStateToProps<IStateProps> = state => ({ value: state.playerSearch })

export const PlayerPickerSearch = connect(
  mapStateToProps,
  mapDispatchToProps
)(_PlayerPickerSearch)
