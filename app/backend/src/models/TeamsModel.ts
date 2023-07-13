import SequelizeTeams from '../database/models/SequelizeTeams';
import { ITeams } from '../Interfaces/ITeams';
import { ITeamsModel } from '../Interfaces/Teams/ITeamModel';
// import { NewEntity } from '../Interfaces';

export default class TeamsModel implements ITeamsModel {
  private model = SequelizeTeams;

  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    return dbData;
  }

  async findById(id: number): Promise<ITeams | null> {
    const dbData = await this.model.findByPk(id);
    return dbData;
  }
}
