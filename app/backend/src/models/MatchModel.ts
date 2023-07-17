import { IMatcheService, IMatcheCreate } from '../Interfaces/IMatches';
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

  async updateFinish(id: string): Promise<void> {
    await this.model.update(
      { inProgress: false },
      {
        where: {
          id,
        },
      },
    );
  }

  async updateMatch(id: string, body: IMatcheService): Promise<void> {
    await this.model.update(
      {
        homeTeamGoals: body.homeTeamGoals,
        awayTeamGoals: body.awayTeamGoals,
      },
      {
        where: {
          id,
        },
      },
    );
  }

  async createMatche(body: IMatcheService): Promise<IMatcheCreate> {
    return this.model.create({ ...body, inProgress: true });
  }
}
