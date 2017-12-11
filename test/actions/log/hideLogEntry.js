import { assert, expect } from 'chai';
import addLogEntry from './../../../src/actions/log/addLogEntry';
import hideLogEntry from './../../../src/actions/log/hideLogEntry';
import ActionTypes from './../../../src/constants/actionTypes';
import LogMessageType from './../../../src/constants/logMessageType';


export function doTests()
{
    it('hideLogEntry', () =>
    {
        const id = 5;
        const action = hideLogEntry(id);

        expect(action).to.eql(
        {
            type: ActionTypes.HideLogEntry,
            payload:
            {
                id
            }
        });
    });
};
