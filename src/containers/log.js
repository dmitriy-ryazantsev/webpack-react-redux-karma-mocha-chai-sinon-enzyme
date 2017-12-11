import { connect } from 'react-redux';
import hideLogEntry from './../actions/log/hideLogEntry';
import LogComponent from './../components/log';


const mapStateToProps = (state) =>
{
    let mapping =
    {
        dataSource: state.log
    };

    return mapping;
};

const mapDispatchToProps = (dispatch) =>
{
    let mapping =
    {
        hideLogMessage: (messageId) =>
        {
            dispatch(hideLogEntry(messageId));
        }
    };

    return mapping;
};

const Log = connect(mapStateToProps, mapDispatchToProps)(LogComponent);

export default Log;
