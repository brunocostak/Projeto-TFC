import { IMatcheService } from '../Interfaces/IMatches';
import MatchesModel from '../models/MatchModel';

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
}
