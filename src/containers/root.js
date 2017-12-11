import { connect } from 'react-redux';
import RootComponent from './../components/root';


const mapStateToProps = (state) =>
{
    let mapping =
    {
        userIdentity: state.userIdentity,
        isFetching: state.isFetching
    };

    return mapping;
};

const mapDispatchToProps = (dispatch) =>
{
    return {};
};

const Root = connect(mapStateToProps, mapDispatchToProps)(RootComponent);

export default Root;
