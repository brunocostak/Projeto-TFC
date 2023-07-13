import { Request, Response } from 'express';
import TeamsService from '../service/team.service';

export default class TeamController {
  constructor(private service = new TeamsService()) {}

  async getAllTeams(req: Request, res: Response): Promise<void> {
    const teams = await this.service.findAll();
    res.status(200).json(teams);
  }

  async getTeamById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const team = await this.service.findById(Number(id));
    res.status(200).json(team);
  }
}
