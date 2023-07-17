import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Example from '../database/models/ExampleModel';
import SequelizeMatche from '../database/models/SequelizeMatches';
import { allTeams, currentPlaying } from './mocks/matche.mock';

import { App } from '../../src/app';

const { app } = new App();

const { expect } = chai;
chai.use(chaiHttp);

describe('Matches', () => {
  afterEach(() => {
    sinon.restore();
});
  it('findAll matches', async () => {
    const response = await chai.request(app).get('/matches');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(allTeams);
  });
  it('findAll matches in progress', async () => {
    const response = await chai.request(app).get('/matches?inProgress=true');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(currentPlaying);
  });

});