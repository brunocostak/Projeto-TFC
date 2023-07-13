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

// Defina os relacionamentos
Matches.belongsTo(TeamsModel, {
  as: 'homeTeam', // Alias para a associação com a equipe da casa
  foreignKey: 'home_team_id', // Coluna que representa o ID da equipe da casa na tabela Matches
});

Matches.belongsTo(TeamsModel, {
  as: 'awayTeam', // Alias para a associação com a equipe visitante
  foreignKey: 'away_team_id', // Coluna que representa o ID da equipe visitante na tabela Matches
});

TeamsModel.hasMany(Matches, {
  as: 'homeMatches', // Alias para a associação com os jogos em casa
  foreignKey: 'home_team_id', // Coluna que representa o ID da equipe da casa na tabela Matches
});

TeamsModel.hasMany(Matches, {
  as: 'awayMatches', // Alias para a associação com os jogos como visitante
  foreignKey: 'away_team_id', // Coluna que representa o ID da equipe visitante na tabela Matches
});

export default Matches;
