import { ITeams } from './ITeams';

interface TeamPerformance {
  name: ITeams | string | null;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
}
export default TeamPerformance;
