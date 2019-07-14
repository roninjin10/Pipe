const steps = ['Projection data is sent from backend', 'site data is uploaded from user']
const endpoints = [
  '/api/v0/nba/projections/team',
  '/api/v0/nba/projections/players',
  '/api/v0/nba/slate/:date/:site',
]
export interface ITeam {
  readonly id: number
  readonly name: string
  readonly teamAbbrev: string
}

export interface ITeamWithProjection extends ITeam {
  readonly lastupdated: string
  readonly opponentAbbrev: string
  readonly starttime: string
  readonly projection: {
    readonly pace: number
    readonly teamScore: number
    readonly opponentScore: number
    readonly overtimeRate?: number
    readonly blowoutRate?: number
  }
}

export interface IPlayer {
  readonly id: number
  readonly name: string
  readonly teamAbbrev: string
}

export interface IPlayerWithProjection extends IPlayer {
  readonly projection: {
    readonly points: number
    readonly rebounds: number
    readonly assists: number
    readonly turnovers: number
    readonly threes: number
    readonly fouls: number
    readonly minutes: number
    readonly usage: number
    readonly assistRate: number
    readonly reboundRate: number
  }
}

export enum SlateType {
  LATESWAP = 'LATESWAP',
  SHOWDOWN = 'SHOWDOWN',
}

export enum FantasySite {
  DK = 'DraftKings',
  FD = 'FanDuel',
}

export enum NBADraftKingsPosition {
  PG = 'PG',
  SG = 'SG',
  SF = 'SF',
  PF = 'PF',
  C = 'C',
  G = 'G',
  F = 'F',
  UTIL = 'UTIL',
}

export interface IDraftKingsPlayer {
  readonly id: number
  readonly name: string
  readonly position: NBADraftKingsPosition[]
  readonly salary: number
  readonly startTime: string
  readonly team: string
  readonly opponent: string
}

export interface ISiteSlate {
  readonly lastupdated: string
  readonly site: FantasySite
  readonly startTime: string
  readonly type: SlateType
  readonly salaryCap: number
  readonly playerPool: IDraftKingsPlayer[]
}
