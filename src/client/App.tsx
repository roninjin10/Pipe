import React from 'react'
import './App.scss'
import { GamePicker } from './components/GamePicker'
import { Heading } from './components/Heading'
import { LineupEditor } from './components/LineupEditor'
import { Optimizer } from './components/Optimizer'
import { PlayerPicker } from './components/PlayerPicker'

import { Layout } from './components/Layout'

export const App = () => (
  <Layout>
    <Heading />
    <Optimizer>
      <GamePicker />
      <PlayerPicker />
      <LineupEditor />
    </Optimizer>
  </Layout>
)
