import React, { PropTypes, Component } from 'react';
import LoginPage from './../containers/pages/loginPage';


export default class PageContent extends Component
{
    render()
    {
        if(this.props.isAuthorized)
        {
            return (
                <div>
                    <h1>Login step passed successfully!</h1>
                </div>);
        }
        else
        {
            return <LoginPage/>;
        }
    }
};

PageContent.propTypes =
{
    isAuthorized: PropTypes.bool.isRequired
}
