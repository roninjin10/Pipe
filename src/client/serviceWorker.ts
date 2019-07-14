import { createStore, Store } from 'redux'
import { IAppState } from './redux/AppState'
import { createWorkerStore } from './redux/store'

type CheckForWorker = <TArgs extends Array<any>, TReturn>(
  cb: (...args: TArgs) => TReturn
) => (...args: TArgs) => TReturn | null

const checkForWorker: CheckForWorker = cb => (...args) => {
  if (!navigator.serviceWorker) {
    return null
  }
  return cb(...args)
}

export const messageWorker = checkForWorker(
  ({ port1: outPort, port2: inPort }: MessageChannel) => <T>(message: T) =>
    new Promise((resolve, reject) => {
      // tslint:disable-next-line
      outPort.onmessage = ({ data }) => (!data.error ? resolve(data) : reject(data.error))

      navigator.serviceWorker!.controller!.postMessage(message, [inPort])
    })
)

type AddWorkerListener = (cb: (t: MessageEvent) => void) => void

const addWorkerListener: AddWorkerListener = cb =>
  navigator.serviceWorker.addEventListener('message', cb)

export const listenToWorker = checkForWorker(addWorkerListener)

type WTF = any

export const listenForProxyStore = (self: ServiceWorker, store: Store<IAppState>): void => {
  self.addEventListener('message', ({ data, ports: [port] }: WTF) => {
    store.dispatch(data)

    port.postMessage(store.getState())
  })
}
