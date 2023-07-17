import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Example from '../database/models/ExampleModel';

import { App } from '../../src/app';
import UserModel from '../database/models/SequelizeUser';
import loginMock, { tokenMock } from './mocks/login.mock';

const { app } = new App();

const { expect } = chai;
chai.use(chaiHttp);

describe('User', () => {
    afterEach(() => {
        sinon.restore();
    });
    it('should return a token', async () => {
        const response = await chai.request(app).post('/login').send(loginMock);
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(tokenMock);
    });
});
