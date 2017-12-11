import { assert, expect } from 'chai';
import addLogEntry from './../../../src/actions/log/addLogEntry';
import hideLogEntry from './../../../src/actions/log/hideLogEntry';
import ActionTypes from './../../../src/constants/actionTypes';
import LogMessageType from './../../../src/constants/logMessageType';


export function doTests()
{
    it('addLogEntry', () =>
    {
        const message = 'testing addLogEntry action';
        let action = addLogEntry(message);

        expect(action).to.be.exist;
        expect(action).to.have.property('type', ActionTypes.AddLogEntry);
        expect(action).to.have.property('payload').to.be.exist;
        expect(action.payload).to.have.property('message').to.be.exist;
        expect(action.payload.message).to.be.a('string');
        expect(action.payload.message).to.eql(message);
        expect(action.payload).to.have.property('type', LogMessageType.Danger);
        expect(action.payload).to.have.property('context').to.be.null;

        action = addLogEntry(message, LogMessageType.Warning);

        expect(action).to.eql(
        {
            type: ActionTypes.AddLogEntry,
            payload:
            {
                message,
                type: LogMessageType.Warning,
                context: null
            }
        });

        const context = {};
        action = addLogEntry(message, LogMessageType.Success, context);

        expect(action).to.eql(
        {
            type: ActionTypes.AddLogEntry,
            payload:
            {
                message,
                type: LogMessageType.Success,
                context
            }
        });
    });
};
