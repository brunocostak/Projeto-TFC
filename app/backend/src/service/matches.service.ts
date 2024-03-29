import { ITeams } from '../Interfaces/ITeams';
import TeamPerformance from '../Interfaces/ITeamPerforance';
import { IMatcheCreate, IMatcheService } from '../Interfaces/IMatches';
import MatchesModel from '../models/MatchModel';
import TeamsService from './team.service';

export default class MatchesService {
  private model = new MatchesModel();

  async findAll(): Promise<IMatcheService[]> {
    const dbData = await this.model.findAll();

    const matches = dbData.map((match: IMatcheService) => ({
      id: match.id,
      homeTeamId: match.homeTeamId,
      homeTeamGoals: match.homeTeamGoals,
      awayTeamId: match.awayTeamId,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: match.inProgress,
      homeTeam: { teamName: match.homeTeam.teamName },
      awayTeam: { teamName: match.awayTeam.teamName },
    }));

    return matches;
  }

  async InProgress(value: boolean): Promise<IMatcheService[]> {
    const dbData = await this.model.InProgress(value);
    return dbData;
  }

  async updateFinish(id: string): Promise<void> {
    await this.model.updateFinish(id);
  }

  async updateMatch(id: string, body: IMatcheService): Promise<void> {
    await this.model.updateMatch(id, body);
  }

  async createMatche(body: IMatcheService): Promise<IMatcheCreate> {
    const result = await this.model.createMatche(body);
    return result;
  }

  // async leaderboardHome(): Promise<TeamPerformance[] | void> {
  //   const dbData = await this.model.leaderboard();
  //   const getAllTeams = await new TeamsService().findAll();

  //   const leaderboard: TeamPerformance[] = getAllTeams.map((team) => {
  //     const teamMatches = dbData.filter(
  //       (match) => match.homeTeamId === team.id,
  //     );
  //     return MatchesService.buildLeaderboard(teamMatches, team);
  //   });
  //   return leaderboard;
  // }

  async leaderboard(leaderboardType: string): Promise<TeamPerformance[] | void> {
    const dbData = await this.model.leaderboard();
    const getAllTeams = await new TeamsService().findAll();

    const leaderboard: TeamPerformance[] = getAllTeams.map((team) => {
      const leaderboardT = leaderboardType === 'away' ? 'awayTeamId' : 'homeTeamId';
      const teamMatches = dbData.filter(
        (match) => match[leaderboardT] === team.id,
      );
      return MatchesService.buildLeaderboard(teamMatches, team);
    });
    return leaderboard;
  }

  private static buildLeaderboard = (match: IMatcheCreate[], team: ITeams) => {
    const totalPoints = MatchesService.calculateTotalPoints(match, team.id);
    const totalGames = match.length;

    return {
      name: team.teamName,
      totalPoints,
      totalGames,
      totalVictories: MatchesService.calculateTotalVictories(match, team.id),
      totalDraws: MatchesService.calculateTotalDraws(match, team.id),
      totalLosses: MatchesService.calculateTotalLosses(match, team.id),
      goalsFavor: MatchesService.calculateGoalsFavor(match, team.id),
      goalsOwn: MatchesService.calculateGoalsOwn(match, team.id),
      goalsBalance: MatchesService.calculateGoalsFavor(match, team.id)
      - MatchesService.calculateGoalsOwn(match, team.id),
      efficiency: ((totalPoints / (totalGames * 3)) * 100).toFixed(2),
    };
  };

  private static calculateTotalPoints(matches: IMatcheCreate[], teamId: number): number {
    return matches.reduce((totalPoints, match) => {
      if (
        (match.homeTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals)
        || (match.awayTeamId === teamId && match.awayTeamGoals > match.homeTeamGoals)
      ) {
        return totalPoints + 3; // A equipe ganhou a partida, recebe 3 pontos
      } if (
        (match.homeTeamId === teamId && match.homeTeamGoals === match.awayTeamGoals)
        || (match.awayTeamId === teamId && match.awayTeamGoals === match.homeTeamGoals)
      ) {
        return totalPoints + 1; // A partida terminou em empate, recebe 1 ponto
      }
      return totalPoints;
    }, 0);
  }

  private static calculateTotalVictories(matches: IMatcheCreate[], teamId: number): number {
    return matches.reduce((totalVictories, match) => {
      if (match.homeTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals) {
        return totalVictories + 1;
      } if (match.awayTeamId === teamId && match.awayTeamGoals > match.homeTeamGoals) {
        return totalVictories + 1;
      }
      return totalVictories;
    }, 0);
  }

  private static calculateTotalDraws(matches: IMatcheCreate[], teamId: number): number {
    return matches.reduce((totalDraws, match) => {
      if (match.homeTeamId === teamId && match.homeTeamGoals === match.awayTeamGoals) {
        return totalDraws + 1;
      } if (match.awayTeamId === teamId && match.awayTeamGoals === match.homeTeamGoals) {
        return totalDraws + 1;
      }
      return totalDraws;
    }, 0);
  }

  private static calculateTotalLosses(matches: IMatcheCreate[], teamId: number): number {
    const totalGames = matches.length;
    const totalVictories = this.calculateTotalVictories(matches, teamId);
    const totalDraws = this.calculateTotalDraws(matches, teamId);
    return totalGames - totalVictories - totalDraws;
  }

  private static calculateGoalsFavor(matches: IMatcheCreate[], teamId: number): number {
    return matches.reduce((goalsFavor, match) => {
      if (match.homeTeamId === teamId) {
        return goalsFavor + match.homeTeamGoals;
      } if (match.awayTeamId === teamId) {
        return goalsFavor + match.awayTeamGoals;
      }
      return goalsFavor;
    }, 0);
  }

  private static calculateGoalsOwn(matches: IMatcheCreate[], teamId: number): number {
    return matches.reduce((goalsOwn, match) => {
      if (match.homeTeamId === teamId) {
        return goalsOwn + match.homeTeamGoals;
      } if (match.awayTeamId === teamId) {
        return goalsOwn + match.awayTeamGoals;
      }
      return goalsOwn;
    }, 0);
  }

  // private static calculateEfficiency(goalsFavor: number, goalsOwn: number): string {
  //   const efficiency = (goalsFavor / (goalsFavor + goalsOwn)) * 100;
  //   return efficiency.toFixed(2);
  // }
}
