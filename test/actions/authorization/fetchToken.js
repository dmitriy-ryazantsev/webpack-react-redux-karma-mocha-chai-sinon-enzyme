import { assert } from 'chai';
import { expect } from 'chai';
import * as fetchToken from './../../../src/actions/authorization/fetchToken';
import ActionTypes from './../../../src/constants/actionTypes';


export function doTests()
{
    describe('fetchToken', () =>
    {
        it('requestToken', () =>
        {
            let action = fetchToken.requestToken();
            let requestTokenAction =
            {
                type: ActionTypes.RequestLogin
            };

            assert.notStrictEqual(action, requestTokenAction, 'assert.notStrictEqual(action, requestTokenAction)')
        });

        it('receiveToken', () =>
        {
            let loginName = 'TestUser';
            let action = fetchToken.receiveToken(loginName);

            expect(action).to.be.exist;
            expect(action).to.have.property('type', ActionTypes.ReceiveLogin);
            expect(action).to.have.property('payload').to.be.exist;
            expect(action.payload).to.have.property('loginName', loginName);
            assert.notStrictEqual(expect(action).to.have.property('payload'),
            {
                loginName: loginName,
                receivedAt: Date.now()
            });
        });

        it('receiveTokenError', () =>
        {
            let action = fetchToken.receiveTokenError();

            expect(action).to.be.exist;
            expect(action).to.have.property('type', ActionTypes.ReceiveLoginError);
        });

        it('fetchToken', () =>
        {
            let action = fetchToken.fetchToken();

            expect(action).to.be.exist;
            expect(action).to.throw(Error);
        });
    });
};
