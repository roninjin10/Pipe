import React, { FunctionComponent } from 'react'
import { Lineup } from './Lineup'
import { LineupButtons } from './LineupButtons'

export const LineupEditor: FunctionComponent = () => (
  <div className="LineupEditor">
    <Lineup />
    <LineupButtons />
  </div>
)
