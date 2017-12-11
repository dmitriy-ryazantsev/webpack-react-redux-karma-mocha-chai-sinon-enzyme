import { assert, expect } from 'chai';
import * as logout from './../../../src/actions/authorization/logout';
import ActionTypes from './../../../src/constants/actionTypes';


export function doTests()
{
    describe('logout', () =>
    {
        it('requestLogout', () =>
        {
            let action = logout.requestLogout();

            expect(action).to.eql(
            {
                type: ActionTypes.RequestLogout
            });
        });

        it('receiveLogout', () =>
        {
            let action = logout.receiveLogout();

            expect(action).to.eql(
            {
                type: ActionTypes.ReceiveLogout
            });
        });

        it('receiveLogoutError', () =>
        {
            let action = logout.receiveLogoutError();

            expect(action).to.eql(
            {
                type: ActionTypes.ReceiveLogoutError
            });
        });

        it('logout', () =>
        {
            let action = logout.logout();

            expect(action).to.be.exist;
            expect(action).to.throw(Error);
        });
    });
};
