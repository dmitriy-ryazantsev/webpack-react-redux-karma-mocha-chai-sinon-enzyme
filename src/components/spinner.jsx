import './../css/spinner.css';
import React, { PropTypes, Component } from 'react';


export default class Spinner extends Component
{
    render()
    {
        if(this.props.isFetching > 0)
        {
            return <div className="loading">Загрузка&#8230;</div>;
        }
        else
        {
            return <div/>;
        }
    }
};

Spinner.propTypes =
{
    isFetching: PropTypes.number.isRequired
}
