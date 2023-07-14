import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Example from '../database/models/ExampleModel';

import { App } from '../../src/app';
import TeamsModel from '../database/models/SequelizeTeams';
import allTeams from './mocks/teams.mock';

const { app } = new App();

const { expect } = chai;

describe('Teams', () => {
    /**
     * Exemplo do uso de stubs com tipos
     */
    
    let chaiHttpResponse: any;
    
    it('Should return all teams', async () => {
        sinon.stub(TeamsModel, 'findAll').resolves(allTeams as any);
        const result = await TeamsModel.findAll();
        expect(result).to.be.eq(allTeams);
    })
    it('Should return a team by id', async () => {
        sinon.stub(TeamsModel, 'findByPk').resolves(allTeams[0] as any);
        const result = await TeamsModel.findByPk(1);
        expect(result).to.be.eq(allTeams[0]);
    })
})
