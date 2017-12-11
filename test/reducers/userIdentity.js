import { expect } from 'chai';
import userIdentity from './../../src/reducers/userIdentity';
import ActionTypes from './../../src/constants/actionTypes';


export function doTests()
{
    describe('userIdentity', () =>
    {
        it('ActionTypes.ReceiveLogin', () =>
        {
            const loginName = 'TestUser';
            const loginTime = Date.now();
            const action =
            {
                type: ActionTypes.ReceiveLogin,
                payload:
                {
                    loginName: loginName,
                    receivedAt: loginTime
                }
            };
            let newState = userIdentity(undefined, action);

            expect(newState).to.be.exist;
            expect(newState).to.have.property('authorized', true);
            expect(newState).to.have.property('loginName', loginName);
            expect(newState).to.have.property('loginTime', loginTime);
        });

        it('ActionTypes.ReceiveLogout', () =>
        {
            const loginName = 'TestUser';
            const loginTime = Date.now();
            const action =
            {
                type: ActionTypes.ReceiveLogout,
                payload:
                {
                    loginName: loginName,
                    receivedAt: loginTime
                }
            };
            let newState = userIdentity(undefined, action);

            expect(newState).to.be.exist;
            // expect(newState).to.have.property('authorized', true);
            // expect(newState).to.have.property('loginName', loginName);
            // expect(newState).to.have.property('loginTime', loginTime);
        });

        it('default', () =>
        {
            let newState = userIdentity(undefined,
            {
                type: ''
            });

            expect(newState).to.be.exist;
            expect(newState).to.have.property('authorized').to.be.false;
            expect(newState).to.have.property('loginName').to.be.null;
            expect(newState).to.not.have.property('loginTime');

            newState = userIdentity({},
            {
                type: ''
            });

            expect(newState).to.be.exist;
            // expect(newState).to.have.property('authorized').to.be.false;
            // expect(newState).to.have.property('loginName').to.be.null;
            // expect(newState).to.not.have.property('loginTime');
        });
    });
};
