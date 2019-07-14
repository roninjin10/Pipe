import { Dispatch } from 'redux'
import { AnyAction } from 'typescript-fsa'
import { IAppState } from '../redux/AppState'

export type AnyFunction = (...args: Array<any>) => any

export type ObjectWithValues<T> = { [key in string]: T }

export type ReduxDispatch = (anyAction: AnyAction) => AnyAction

export type Args<F extends AnyFunction> = F extends (...args: infer A) => any ? A : never

export type SecondArg<F extends AnyFunction> = F extends (
  firstArg: any,
  secondArg: infer A,
  ...args: Array<any>
) => any
  ? A
  : never

export type MapStateToProps<T extends object> = (appState: IAppState) => T

export type MapDispatchToProps<T extends object> = (dispatch: Dispatch) => T

export type INBALineup = [
  IPlayer | null,
  IPlayer | null,
  IPlayer | null,
  IPlayer | null,
  IPlayer | null,
  IPlayer | null,
  IPlayer | null,
  IPlayer | null
]

export type ZeroThroughEight = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

export interface IHomeAway {
  readonly home: string
  readonly away: string
}

export interface IPlayer {
  readonly position: string
  readonly namePlusId: string
  readonly name: string
  readonly id: string
  readonly rosterPosition: string
  readonly salary: number
  readonly gameInfo: IHomeAway
  readonly fantasyPoints: number
  readonly team: string
}
