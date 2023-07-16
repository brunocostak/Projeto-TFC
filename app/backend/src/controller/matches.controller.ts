import { Request, Response } from 'express';
import MatchesService from '../service/matches.service';

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
}
