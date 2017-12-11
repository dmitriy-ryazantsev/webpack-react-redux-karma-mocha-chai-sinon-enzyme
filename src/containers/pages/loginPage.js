import { connect } from 'react-redux';
import { fetchToken } from './../../actions/authorization/fetchToken';
import LoginPageComponent from './../../components/pages/loginPage';


const mapStateToProps = (state) =>
{
    return {};
};

const mapDispatchToProps = (dispatch) =>
{
    let mapping =
    {
        login: (login, password) =>
        {
            dispatch(fetchToken(login, password));
        }
    };

    return mapping;
};

const LoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPageComponent);

export default LoginPage;
