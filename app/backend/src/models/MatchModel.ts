import { IMatcheService } from '../Interfaces/IMatches';
import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeams from '../database/models/SequelizeTeams';

export default class MatchesModel {
  private model = SequelizeMatches;

  async findAll(): Promise<IMatcheService[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: SequelizeTeams, as: 'homeTeam' },
        { model: SequelizeTeams, as: 'awayTeam' },
      ],
    });

    const matches: IMatcheService[] = dbData.map((match) => match.toJSON());

    return matches;
  }

  async InProgress(value: boolean): Promise<IMatcheService[]> {
    const dbData = await this.model.findAll({
      where: {
        inProgress: value,
      },
      include: [
        { model: SequelizeTeams, as: 'homeTeam' },
        { model: SequelizeTeams, as: 'awayTeam' },
      ],
    });

    const matches: IMatcheService[] = dbData.map((match) => match.toJSON());

    return matches;
  }
}
