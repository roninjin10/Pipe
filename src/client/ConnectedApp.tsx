import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { createProxyStore } from './redux/store'

export const ConnectedApp = () => (
  <Provider store={createProxyStore(navigator)}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
