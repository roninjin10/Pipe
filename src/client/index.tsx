import React from 'react'
import ReactDOM from 'react-dom'
import { ConnectedApp } from './ConnectedApp'

ReactDOM.render(<ConnectedApp />, document.getElementById('root'))

const setupWorker = () => {
  navigator.serviceWorker.register('serviceWorker.js', {
    scope: '/',
  })
}
