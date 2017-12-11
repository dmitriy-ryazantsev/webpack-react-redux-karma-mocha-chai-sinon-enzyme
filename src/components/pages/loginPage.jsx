import './../../css/blockSelection.css';
import React, { PropTypes, Component } from 'react';
import Default from './../../constants/defaults';


export default class LoginPage extends Component
{
    constructor(props)
    {
        super(props);

        this.login = this.login.bind(this);
        this.authorize = this.authorize.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }

    render()
    {
        let modalForm = (
            <div className='w3-modal-content w3-card-8 w3-animate-zoom' style={{ maxWidth: '500px' }}>
                <div className='w3-center block-selection'>
                    <br/>
                    <span onClick={ this.closeDialog } className='w3-closebtn w3-hover-red w3-container w3-padding-8 w3-display-topright' title='Закрыть диалоговое окно' style={{ width: '50px', height: '50px' }}>&times;</span>
                    <img src='/images/img_avatar3.png' alt='Avatar' style={{ width: '30%' }} className='w3-circle w3-margin-top'/>
                </div>
                <form className='form' id='loginForm' onSubmit={ this.authorize } style={{ padding: '17px' }}>
                    <input name='username' id='loginUserName' type='text' className='form-control' placeholder='Введите логин'/>
                    <br/>
                    <input name='password' id='loginPassword' type='password' className='form-control' placeholder='Введите пароль'/>
                    <br/>
                    <button className='w3-btn-block w3-pale-green w3-border w3-round block-selection'>Войти</button>
                </form>
                <div className='w3-container w3-border-top w3-padding-16 w3-light-grey'>
                    <button type='button' className='w3-btn w3-pale-red w3-border w3-round' onClick={ this.closeDialog }>Отмена</button>
                    <span className='w3-right w3-padding w3-hide-small'>{ Default.Version }</span>
                </div>
            </div>
        );

        return (
            <div>
                <div className='w3-display-middle'>
                    <p className='w3-xlarge'>react-redux</p>
					<p className='w3-xlarge'>boilerplate</p>
					<p className='w3-xlarge'>application</p>
					<br/>
					<a href='#' style={{ color: 'black'}} onClick={ this.login }>Войти в систему</a>
                </div>
                <div id='loginPage' className='w3-container w3-modal' style={{ display: 'block', paddingTop: '100px' }}>
                    { modalForm }
                </div>
            </div>
        );
    }

    login(e)
    {
        e.preventDefault();

        document.getElementById('loginPage').style.display = 'block';
    }

    authorize(e)
    {
        e.preventDefault();

        let usernameValue;
        let passwordValue;
        if(typeof loginUserName === 'undefined')
        {
            usernameValue = document.getElementById('loginUserName').value;
            passwordValue = document.getElementById('loginPassword').value;
        }
        else
        {
            usernameValue = loginUserName.value;
            passwordValue = loginPassword.value;
        }
        this.props.login(usernameValue, passwordValue);
    }

    closeDialog(e)
    {
        e.preventDefault();

        document.getElementById('loginPage').style.display = 'none';
    }
}

LoginPage.propTypes =
{
    login: PropTypes.func.isRequired
}
