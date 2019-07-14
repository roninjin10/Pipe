import { IAppState } from '../redux/AppState'
import { INBALineup, IPlayer, ZeroThroughEight } from './types'
import { throwIf } from '../../utils/throwIf';

type LineupShape = ReadonlyArray<Set<NBAPosition>>

export type PlayerRoster = ReadonlyArray<IPlayer | null>

const buildEmptyLinep = (lineupShape: LineupShape): PlayerRoster => lineupShape.map(() => null)

const sumField = (field: 'fantasyPoints' | 'salary') => (lineup: ReadonlyArray<IPlayer | null>) =>
  lineup
    .map(spot => (spot === null ? 0 : Number(spot[field])))
    .reduce((total, points) => total + points, 0)

export const getTotalSalary = sumField('salary')
export const getTotalFantasyPoints = sumField('fantasyPoints')

const getValidPositions = (lineupShape: LineupShape, position: string) =>
  [...lineupShape].reduce(
    (a, positionShape, i) => (positionShape.has(position as any) ? [...a, i] : a),
    [] as ReadonlyArray<number>
  )

const getFilledSpots = (lineup: PlayerRoster): ReadonlyArray<number> =>
  [...lineup].reduce((a, spot, i) => (spot !== null ? [...a, i] : a), [] as ReadonlyArray<number>)

const sportSpecificLineup = (lineupShape: LineupShape, salaryCap: number) => {
  const _addPlayersToLineup = (
    playersToAdd: ReadonlyArray<IPlayer>,
    currentLineup = buildEmptyLinep(lineupShape)
  ): PlayerRoster | null => {
    const [nextPlayer, ...restOfPlayers] = playersToAdd

    if (!nextPlayer) {
      return currentLineup
    }

    if (getTotalSalary(currentLineup) + Number(nextPlayer.fantasyPoints) > salaryCap) {
      return null
    }

    for (const position of nextPlayer.position.split('/')) {
      const filledSpots = new Set(getFilledSpots(currentLineup))
      const validPositions = getValidPositions(lineupShape, position)

      const availablePositions = validPositions.filter(i => !filledSpots.has(i))

      for (const i of availablePositions) {
        const luWithPlayer = currentLineup.map((currentPlayer, j) =>
          i === j ? nextPlayer : currentPlayer
        )

        const luFilledOut = _addPlayersToLineup(restOfPlayers, luWithPlayer)

        if (luFilledOut) {
          return luFilledOut
        }
      }
    }

    return null
  }

  const addPlayersToLineup = (
    playersToAdd: ReadonlyArray<IPlayer>,
    currentLineup = buildEmptyLinep(lineupShape)
  ): PlayerRoster => {
    const newLineup = _addPlayersToLineup(playersToAdd, currentLineup)
    throwIf(!newLineup, 'Cannot add players to roster')
    return newLineup
  }

  return addPlayersToLineup
}

const existsOrThrow = <T extends any>(value: T, message = ''): T => {
  if (!value) {
    throw new Error(message)
  }
  return value
}

enum NBAPosition {
  PG = 'PG',
  SG = 'SG',
  SF = 'SF',
  PF = 'PF',
  C = 'C',
}

const nbaDkShape: LineupShape = [
  new Set([NBAPosition.PG]),
  new Set([NBAPosition.SG]),
  new Set([NBAPosition.SF]),
  new Set([NBAPosition.PF]),
  new Set([NBAPosition.C]),
  new Set([NBAPosition.PG, NBAPosition.SG]),
  new Set([NBAPosition.SF, NBAPosition.PF]),
  new Set([NBAPosition.PG, NBAPosition.SG, NBAPosition.SF, NBAPosition.PF, NBAPosition.C]),
]

const FIFTY_THOUSAND = 50000
const SALARY_CAP_NBA_DK = FIFTY_THOUSAND

export const addPlayersToNbaLineup = (...players: Array<IPlayer | null>) =>
  sportSpecificLineup(nbaDkShape, SALARY_CAP_NBA_DK)(players.filter(
    player => player
  ) as ReadonlyArray<IPlayer>) as INBALineup

export const defaultNbaLineup: INBALineup = [null, null, null, null, null, null, null, null]

export const addPlayers = (lineup: INBALineup, ...players: Array<IPlayer>) =>
  addPlayersToNbaLineup(...lineup, ...players)

export const removePlayer = (lineup: INBALineup, index: ZeroThroughEight) =>
  lineup.map((spot, i) => (i === index ? null : spot)) as INBALineup
