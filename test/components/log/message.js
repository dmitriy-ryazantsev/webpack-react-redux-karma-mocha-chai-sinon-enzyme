import React from 'react';
import { expect } from 'chai';
import { mount, shallow, render } from 'enzyme';
import sinon from 'sinon/pkg/sinon';
import Message from './../../../src/components/log/message.jsx';
import LogMessageType from './../../../src/constants/logMessageType';


export function doTests()
{
    it('Message', () =>
    {
        const dataSource =
        {
            type: LogMessageType.Info
        };
        let params =
        {
            hideLogMessage: ()=>{},
            id: 1,
            dataSource:
            {
                type: LogMessageType.Info
            }
        };
        sinon.spy(Message.prototype, 'componentDidMount');
        // const wrapper = mount(<Message dataSource={ dataSource }/>);
        const wrapper = mount(<Message { ...params }/>);
        expect(Message.prototype.componentDidMount.calledOnce).to.equal(true);
    });
};
