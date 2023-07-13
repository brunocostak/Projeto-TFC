import { Model, QueryInterface, DataTypes } from 'sequelize';
import { IMatches } from '../../Interfaces/IMatches';

export default {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.createTable<Model<IMatches>>('matches', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            homeTeamId: {
                allowNull: false,
                type: DataTypes.INTEGER,
                field: 'home_team_id',
                // references: {
                //     model: 'teams', // Nome da tabela que contém os nomes das equipes
                //     key: 'id', // Nome da coluna que representa o ID da equipe
                //   },
            },
            homeTeamGoals: {
                allowNull: false,
                type: DataTypes.INTEGER,
                field: 'home_team_goals',
            },
            awayTeamId: {
                allowNull: false,
                type: DataTypes.INTEGER,
                field: 'away_team_id',
                // references: {
                //     model: 'teams',
                //     key: 'id',
                //   },
            },
            awayTeamGoals: {
                allowNull: false,
                type: DataTypes.INTEGER,
                field: 'away_team_goals',
            },
            inProgress: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
                field: 'in_progress',
            },
        });
    },
    down: (queryInterface: QueryInterface) => {
        return queryInterface.dropTable('matches');
    }
}