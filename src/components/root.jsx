import './../css/w3.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { PropTypes, Component } from 'react';
import PageContent from './pageContent';
import Log from './../containers/log';
import Spinner from './spinner';


export default class Root extends Component
{
    render()
    {
        return (
            <div>
                <PageContent isAuthorized={ this.props.userIdentity.authorized }/>
                <Log/>
                <Spinner isFetching={ this.props.isFetching }/>
            </div>
      );
    }
};

Root.propTypes =
{
    userIdentity: PropTypes.object.isRequired,
    isFetching: PropTypes.number.isRequired
}
