import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

import TeamsModel from './SequelizeTeams';

class Matches extends Model<InferAttributes<Matches>, InferCreationAttributes<Matches>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeamId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    homeTeamGoals: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    awayTeamId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    awayTeamGoals: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    inProgress: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
    underscored: true,
  },
);

Matches.belongsTo(TeamsModel, {
  as: 'homeTeam',
  foreignKey: 'home_team_id',
  targetKey: 'id',
});

Matches.belongsTo(TeamsModel, {
  as: 'awayTeam',
  foreignKey: 'away_team_id',
  targetKey: 'id',
});

TeamsModel.hasMany(Matches, {
  as: 'homeMatches',
  foreignKey: 'home_team_id',
});

TeamsModel.hasMany(Matches, {
  as: 'awayMatches',
  foreignKey: 'away_team_id',
});

export default Matches;
