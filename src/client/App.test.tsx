import 'jsdom-global/register'
import React from 'react'
import { App } from './App'
import * as enzyme from 'enzyme'

it('renders without crashing', () => {
  const renderedApp = enzyme.mount(<App />)
  expect(renderedApp.isEmpty()).toBe(false)
})
