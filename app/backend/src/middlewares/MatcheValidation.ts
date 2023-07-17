import { Request, Response, NextFunction } from 'express';
import MatchesModel from '../database/models/SequelizeMatches';

const validateMatche = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const { homeTeamId, awayTeamId } = req.body;
  const dbData = await MatchesModel.findAll();

  if (homeTeamId === awayTeamId) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  const homeTeamExists = dbData.some((match) => match.homeTeamId === homeTeamId);
  const awayTeamExists = dbData.some((match) => match.awayTeamId === awayTeamId);

  if (!homeTeamExists || !awayTeamExists) {
    return res.status(404)
      .json({ message: 'There is no team with such id!' });
  }

  next();
};

export default validateMatche;
