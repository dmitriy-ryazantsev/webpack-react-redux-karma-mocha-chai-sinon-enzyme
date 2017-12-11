import React, { PropTypes, Component } from 'react';
import Message from './message';


export default class Log extends Component
{
    constructor(props)
    {
        super(props);

        this.renderMessages = this.renderMessages.bind(this);
    }

    render()
    {
        let messages = this.renderMessages(this.props.dataSource);
        let result = (
            <div style={{ position: 'fixed', top: '0px', right: '0px', zIndex: '101' }}>
                { messages }
            </div>
        );

        return result;
    }

    renderMessages(collection)
    {
        if (collection.length > 0)
        {
            let result = [];
            collection.forEach((item, index) =>
            {
                if(!item.showed)
                {
                    result.push(<Message key={ index } id={ index } dataSource={ item } hideLogMessage={ this.props.hideLogMessage }/>);
                }
            });

    		return result;
        }
        else
        {
            return [];
        }
    }
};

Log.propTypes =
{
    hideLogMessage: PropTypes.func.isRequired,
    dataSource: PropTypes.array.isRequired
}
