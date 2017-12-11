import './../../css/logMessage.css';
import React, { PropTypes, Component } from 'react';
import LogMessageType from './../../constants/logMessageType';


export default class Message extends Component
{
    constructor(props)
    {
        super(props);

        this.markMessageAsRead = this.markMessageAsRead.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.showContextDetails = this.showContextDetails.bind(this);
    }

    componentDidMount()
    {
        switch (this.props.dataSource.type)
        {
            case LogMessageType.Info:
            case LogMessageType.Success:
            case LogMessageType.Warning:
            {
                setTimeout(() =>
                {
                    this.props.hideLogMessage(this.props.id);
                },
                13000);

                break;
            }
            default:
            {
                break;
            }
        }
    }

    render()
    {
        let headerText;
        let messageClass;
        let descriptionLink = "";

        switch (this.props.dataSource.type)
        {
            case LogMessageType.Info:
            {
                headerText = 'Информация!';
                messageClass = 'alert alert-info log-message';

                break;
            }
            case LogMessageType.Success:
            {
                headerText = 'Успех!';
                messageClass = 'alert alert-success log-message';

                break;
            }
            case LogMessageType.Warning:
            {
                headerText = 'Предупреждение!';
                messageClass = 'alert alert-warning log-message';

                break;
            }
            default:
            {
                headerText = 'Ошибка!';
                messageClass = 'alert alert-danger';

                break;
            }
        }

        if (this.props.dataSource.context != null)
        {
        	descriptionLink = "подробнее";
        }

        let result = (
            <div className={ messageClass + ' w3-animate-right'} style={{ clear: 'right', float: 'right', marginBottom: '1px' }}>
                <a href='javascript:void(0);' onMouseEnter={ this.onMouseEnter } onMouseLeave={ this.onMouseLeave } onClick={ this.markMessageAsRead } className='close' data-dismiss='alert' aria-label='close'>&times;</a>
                <strong>{ headerText }&nbsp;&nbsp;</strong>{ this.props.dataSource.text }&nbsp;&nbsp;
                <br/>
                <a href='#' onClick={ this.showContextDetails } className='log-message-descriptionLink' title={ this.props.dataSource.stack }>{ descriptionLink }</a>
            </div>
        );

        return result;
    }

    onMouseEnter(e)
    {
        e.target.classList.toggle('log-message-close');
    }

    onMouseLeave(e)
    {
        e.target.classList.toggle('log-message-close');
    }

    markMessageAsRead()
    {
        this.props.hideLogMessage(this.props.id);
    }

    showContextDetails(e)
    {
    	e.currentTarget.text = this.props.dataSource.context;
    	e.currentTarget.className = "log-message-descriptionText";
        e.currentTarget.title = "";
    }
}

Message.propTypes =
{
    hideLogMessage: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    dataSource: PropTypes.object.isRequired
}
