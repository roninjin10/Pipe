import { IHomeAway, IPlayer } from './types'

interface IDummyDataPlayer {
  readonly AvgPointsPerGame: string
  readonly Salary: string
  readonly Position: string
  readonly Name: string
  readonly ID: string
  readonly TeamAbbrev: string
  readonly 'Roster Position': string
  readonly 'Name + ID': string
  readonly 'Game Info': string
}

type GetHomeAway = (gameInfo: string) => IHomeAway

const getHomeAway: GetHomeAway = gameInfo => {
  const [away, home] = gameInfo.split(' ')[0].split('@')
  return { away, home }
}

type DummyDataToPlayer = (player: IDummyDataPlayer) => IPlayer

export const dummyDataToPlayer: DummyDataToPlayer = player => ({
  fantasyPoints: Number(player.AvgPointsPerGame),
  gameInfo: getHomeAway(player['Game Info']),
  id: player.ID,
  name: player.Name,
  namePlusId: player['Name + ID'],
  position: player.Position,
  rosterPosition: player['Roster Position'],
  salary: Number(player.Salary),
  team: player.TeamAbbrev,
})
