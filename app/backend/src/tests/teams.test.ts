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
chai.use(chaiHttp);

describe('Teams', () => {
    /**
     * Exemplo do uso de stubs com tipos
     */
    
    let chaiHttpResponse: any;

    afterEach(() => {
        sinon.restore();
    })
    
    it('Should return all teams', async () => {
        // sinon.stub(TeamsModel, 'findAll').resolves(allTeams as any);
        // const result = await TeamsModel.findAll();
        // expect(result).to.be.eq(allTeams);
        sinon.stub(TeamsModel, 'findAll').resolves(allTeams as any);
        chaiHttpResponse = await chai.request(app).get('/teams');
        expect(chaiHttpResponse.body).to.be.eq(allTeams);
    })
    it('Should return a team by id', async () => {
        // sinon.stub(TeamsModel, 'findByPk').resolves(allTeams[0] as any);
        // const result = await TeamsModel.findByPk(1);
        // expect(result).to.be.eq(allTeams[0]);
        sinon.stub(TeamsModel, 'findByPk').resolves(allTeams[0] as any);
        chaiHttpResponse = await chai.request(app).get('/teams/1');
        expect(chaiHttpResponse.body).to.be.eq(allTeams[0]);
    })
})
