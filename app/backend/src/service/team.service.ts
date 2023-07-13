import TeamsModel from '../models/TeamsModel';
// import { NewEntity } from '../Interfaces';
import { ITeams } from '../Interfaces/ITeams';
import { ITeamsModel } from '../Interfaces/Teams/ITeamModel';

export default class TeamsService implements ITeamsModel {
  private model = new TeamsModel();

  async findAll(): Promise<ITeams[]> {
    console.log('TeamsService.findAll()');
    const dbData = await this.model.findAll();
    return dbData;
  }

  async findById(id: number): Promise<ITeams | null> {
    const dbData = this.model.findById(id);
    return dbData;
  }
}
