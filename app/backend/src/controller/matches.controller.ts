import { Request, Response } from 'express';
import MatchesService from '../service/matches.service';
import TeamPerformance from '../Interfaces/ITeamPerforance';

export default class MatchesController {
  constructor(private service = new MatchesService()) {}

  async findAll(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;
    const isInProgress = inProgress === 'true';

    if (inProgress === undefined) {
      const data = await this.service.findAll();
      res.status(200).json(data);
    } else {
      const data = await this.service.InProgress(isInProgress);
      res.status(200).json(data);
    }
  }

  async updateFinish(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await this.service.updateFinish(id);
    res.status(200).json({ message: 'Finished' });
  }

  async updateMatch(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await this.service.updateMatch(id, req.body);
    res.status(200).json({ message: 'Updated matche' });
  }

  async createMatche(req: Request, res: Response): Promise<void | Response> {
    try {
      const dbData = await this.service.createMatche(req.body);
      const result = {
        id: dbData.id,
        homeTeamId: dbData.homeTeamId,
        homeTeamGoals: dbData.homeTeamGoals,
        awayTeamId: dbData.awayTeamId,
        awayTeamGoals: dbData.awayTeamGoals,
        inProgress: dbData.inProgress,
      };
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ message: 'Error creating match' });
    }
  }

  async leaderboard(req: Request, res: Response): Promise<void> {
    const leaderboardType = req.path.includes('home') ? 'home' : 'away';
    const data: TeamPerformance[] | void = await this.service.leaderboard(leaderboardType);
    if (data) {
      const sortedLeaderboard = MatchesController.sortLeaderboardData(data);
      res.status(200).json(sortedLeaderboard);
    }
  }

  private static sortLeaderboardData(data: TeamPerformance[]): TeamPerformance[] {
    return data.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) {
        return b.totalPoints - a.totalPoints; // Ordenar por total de pontos (decrescente)
      }

      if (a.totalVictories !== b.totalVictories) {
        return b.totalVictories - a.totalVictories; // Ordenar por total de vitórias (decrescente)
      }

      if (a.goalsBalance !== b.goalsBalance) {
        return b.goalsBalance - a.goalsBalance; // Ordenar por saldo de gols (decrescente)
      }

      if (a.goalsFavor !== b.goalsFavor) {
        return b.goalsFavor - a.goalsFavor; // Ordenar por gols a favor (decrescente)
      }
      return 0;
    });
  }
}
