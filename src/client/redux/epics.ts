import { combineEpics, Epic } from 'redux-observable'
import { mergeMap } from 'rxjs/operators'
import { messageWorker as curriedMessageWorker } from '../serviceWorker'

type WTF = any

const messageWorker = curriedMessageWorker(new MessageChannel()) as WTF

const dispatchToProxyStore: Epic = action$ =>
  action$.pipe(mergeMap(action => messageWorker(action)))

export const proxyEpics = combineEpics(dispatchToProxyStore)

export const workerEpics = combineEpics()
