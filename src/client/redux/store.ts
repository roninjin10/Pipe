import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { createStore, Store } from 'redux'
import { applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createEpicMiddleware } from 'redux-observable'
import { IS_PROD } from '../lib/isProd'
import { INITIAL_STATE } from './initialState'
import { proxyReducers, workerReducers } from './reducers'
import * as actions from './actions'
import { IAppState } from './AppState'
import { proxyEpics, workerEpics } from './epics'

const getProxyMiddleware = () => {
  const epicMiddleware = createEpicMiddleware()

  const run = () => epicMiddleware.run(proxyEpics)

  const middleware = applyMiddleware(routerMiddleware(createBrowserHistory()), epicMiddleware)

  return { middleware, run }
}

const getWorkerMiddleware = () => {
  const epicMiddleware = createEpicMiddleware()

  const run = () => epicMiddleware.run(workerEpics)

  const middleware = applyMiddleware(epicMiddleware)

  const maybeComposedMiddleware = IS_PROD ? middleware : composeWithDevTools(middleware)

  return {
    middleware: maybeComposedMiddleware,
    run,
  }
}

const connectWorkerToProxy = (worker: ServiceWorker) => (store: Store<IAppState>) => {
  // tslint:disable-next-line:no-let
  let proxyPort: MessagePort | null = null

  const listenForProxyDispatches = (e: MessageEvent) => {
    proxyPort = e.ports[0]
    store.dispatch(e.data)
  }

  const updateProxy = () => proxyPort && proxyPort.postMessage(store.getState())

  store.subscribe(updateProxy)
  worker.addEventListener('message', (e: Event) => listenForProxyDispatches(e as MessageEvent))

  return store
}

const connectProxyToWorker = (navigator: Navigator) => (store: Store<IAppState>) => {
  const handleWorkerStoreUpdate = (ev: MessageEvent) =>
    store.dispatch(actions.updateState(ev.data as IAppState))

  navigator.serviceWorker.addEventListener('message', handleWorkerStoreUpdate)

  return store
}

export const createWorkerStore = (worker: ServiceWorker): Store<IAppState> => {
  const { middleware, run } = getWorkerMiddleware()
  const store = connectWorkerToProxy(worker)(createStore(workerReducers, INITIAL_STATE, middleware))
  run()
  return store
}

export const createProxyStore = (navigator: Navigator): Store<IAppState> => {
  const { middleware, run } = getProxyMiddleware()
  const store = connectProxyToWorker(navigator)(
    createStore(proxyReducers, INITIAL_STATE, middleware)
  )
  run()
  return store
}
