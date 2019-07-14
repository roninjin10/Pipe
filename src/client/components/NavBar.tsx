import React, { FunctionComponent } from 'react'
import { ReduxDispatch } from '../lib/types'

interface INavBarProps {
  readonly reduxDispatch: ReduxDispatch
}

export const NavBar: FunctionComponent<INavBarProps> = () => <div>Nav bar fantasy stacks</div>
