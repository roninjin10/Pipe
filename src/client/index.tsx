import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'

const ROOT_ID = 'root'

const render = async () => {
  const rootElement = document.getElementById(ROOT_ID)

  if (!rootElement) {
    throw new Error(`Unable to find root element with id ${ROOT_ID}`)
  }

  ReactDOM.render(<App />, rootElement)
}

render()
