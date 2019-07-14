import React, { FunctionComponent } from 'react'
import { PlayerPickerGrid } from './PlayerPickerGrid'
import { PlayerPickerSearch } from './PlayerPickerSearch'
import { PositionFilters } from './PositionFilters'

export const PlayerPicker: FunctionComponent = () => (
  <div className="PlayerPicker">
    <PlayerPickerSearch />
    <PositionFilters />
    <PlayerPickerGrid />
  </div>
)
